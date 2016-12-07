Meteor React Routing
====================

## What ?
A simple bridge between Meteor - FlowRouter - react-mounter. This package allows you
to easily create your routes. For the rest / custom functionality check more on:

https://github.com/kadirahq/flow-router

For Basic Meteor Introduction, check Chapter 1 from: http://www.meteor-tuts.com 

## Install
```bash
meteor add cultofcoders:meteor-react-routing

# make sure you have everything you need installed:
meteor npm install --save react react-mounter react-dom
```

```js
// file: /imports/routing/router.js
import { createRouter } from 'meteor/cultofcoders:meteor-react-routing';
import App from '/imports/ui/App.jsx'; // or the place where you have your main entry component

export default createRouter(App); // App is the main entry component for your routes
```

### App.jsx example:
```jsx
// file: /imports/ui/App.jsx
import React from 'react';

export default ({main, routeProps}) => {
    // main represents the component to render passed from the router
    // route props represent the properties that it receives from the router
    
    // where we do createElement, that's where your components will get rendered.
    return (
        <div id="app">
            {React.createElement(main, routeProps)}
        </div>
    )
}
```

### API
```js
import route from '/imports/routing/router.js';

route(path, Component, properties, flowRouterAdditionalOptions);
```

### Basic usage

```js
// file: /imports/routing/index.js

import route from './router.js';
import Home from '/imports/ui/Home.jsx';

route('/', Home);
```

Meteor needs to be aware of our routes:

```js
// file: /imports/startup/client/index.js

import '/imports/routing';
```

### Parameters

```js
route('/posts/:_id', PostView);

// for the route '/posts/XXX'
// in App.jsx routeProps will look like {_id: 'XXX'}
// PostView will have access to _id by using this.props
```

### Optional Parameters
```js
route('/posts/:_id?', PostView);
```

### Query Parameters
```js
route('/posts/:_id', PostView);

// accessing /posts/XXX?commentsPage=2
// routeProps will look like:
{ _id: 'XXX', query: {commentsPage: 2} }
```

### Extended Parameters
```js
route('/admin/panel/categories', AdminPanel, {
    panel: 'categories'
});
route('/admin/panel/something', AdminPanel, {
    panel: 'something'
});

// accessing /admin/panel/categories
// routeProps will look like:
{ panel: 'Something' }

route('/admin/panel/view/:_id', AdminPanel, {
    panel: 'view'
});

// accessing /admin/panel/view/XXX
// routeProps will look like: (they will be embedded)
{ panel: 'Something', _id: XXX }
```

### Dynamic Extended Parameters
```js
route('/admin/panel/view/:_id', AdminPanel, (params, queryParams) => {
    return {something: true};
});


// accessing /admin/panel/view/XXX
// routeProps will look like:
{ something: true }

// if you want to use the params and queryParams passed to routeProps you have to do it manually
// something like:
route('/admin/panel/view/:_id', AdminPanel, (params, queryParams) => {
    return _.extend({}, params, {query: queryParams}, {something: true});
});
```

### Generating Routes
```js
// route('/posts/:_id', PostView);
import router from '/imports/routing/router.js';

router.path('/posts/:_id', {_id: 'XXX'}) // returns /posts/XXX

// if you want query parameters:
router.path('/posts/:_id', {_id: 'XXX'}, {page: 2}) // returns /posts/XXX?page=2
```

### Named Routes
```js
import route from '/imports/routing/router.js';
route('/posts/:_id', PostView, {}, {
    name: 'post_view'
})

// generating the route with the name:
route.path('post_view', {_id: 'XXX'}) // returns /posts/XXX
```

### Travel to a different route.

An action happens, someone submitted a form, you want to take him to the list or some other place:

```
import route from '/imports/routing/router.js';

route.go('/posts/:_id', {_id: 'XXX'}, {page: 2}) // pathDef, params, queryParams

// or for a named route:
route.go('post_view', {_id: 'XXX'}, {page: 2}) // pathDef, params, queryParams
```

### Getting the current route
```js
import route from '/imports/routing/router.js';

console.log(route.current()) 
// prints following object
{
     path: "/apps/this-is-my-app?show=yes&color=red",
     params: {appId: "this-is-my-app"},
     queryParams: {show: "yes", color: "red"}
     route: {pathDef: "/apps/:appId", name: "name-of-the-route"}
}
```

### Advanced usage and hooks

Check out flow-router, the 4th parameter from route() lets you do all the other options that you want like:
- triggersEnter
- triggersExit
- name

### User Aware Layouts

First make sure you give this a read: 
https://guide.meteor.com/react.html#using-createContainer

```bash
// terminal
meteor add react-meteor-data
```

```js
// file: /imports/api/App.jsx
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import NavBar from '/imports/ui/NavBar.jsx';

const App = ({main, routeProps, user}) => {
    return (
        <div id="app">
            {user ? <NavBar user={user} /> : null}
            {React.createElement(main, routeProps)}
        </div>
    )
})

export default createContainer((props) => {
    const user = Meteor.user();
    
    return _.extend(props, {user});
}, App);
```

### Further reading:

Read more on: https://github.com/kadirahq/flow-router#routes-definition