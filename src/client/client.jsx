'use strict';

require("./app.css");

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  React.render(<Handler routerState={state} environment="browser" />, document.body);
});
