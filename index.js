import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'react': '0.15.x',
    'react-mounter': '1.2.x',
}, 'cultofcoders:meteor-react-routing');

import createRouter from './createRouter';

export { createRouter }