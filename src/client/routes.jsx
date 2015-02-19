"use strict";

var React = require('react');
var { Route, NotFoundRoute, DefaultRoute, Redirect } = require('react-router');

var Routes = (
  <Route>
    <DefaultRoute name="Home" handler={require('./App')}/>
    <Redirect from="foo" to="Home"/>
  </Route>
);

module.exports = Routes;