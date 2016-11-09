import { mount } from 'react-mounter';
import { _ } from 'meteor/underscore';

export default function (App) {
    let handler = (path, component, propsFn, options = {}) => {
        _.extend(options, {
            action(params, queryParams) {
                let componentProps = {};
                if (_.isFunction(propsFn)) {
                    componentProps = propsFn.call(propsFn, params, queryParams);
                } else if (_.isObject(propsFn)) {
                    componentProps = _.extend(params, propsFn);
                } else {
                    componentProps = params;
                }

                if (queryParams) {
                    _.extend(componentProps, {
                        query: queryParams
                    })
                }

                mount(App, {main: component, routeProps: componentProps});
            }
        });

        FlowRouter.route(path, options);
    };

    handler.add = handler.bind(FlowRouter);
    handler.path = FlowRouter.path.bind(FlowRouter);
    handler.current = FlowRouter.current.bind(FlowRouter);

    return handler;
}