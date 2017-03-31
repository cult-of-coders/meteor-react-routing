Package.describe({
  name: 'cultofcoders:meteor-react-routing',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: 'Very easy way to build routes for your Meteor + React application',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.3');
  api.use('ecmascript');
  api.use('underscore');
  api.use('tmeasday:check-npm-versions@0.3.1');

  api.use('kadira:flow-router@2.12.1');
  api.imply('kadira:flow-router@2.12.1');

  api.mainModule('index.js', 'client');
});

// No testing yet, feel free to contribute.
// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
// });
