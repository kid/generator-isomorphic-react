"use strict";

var React = require("react");
var { Route, DefaultRoute } = require("react-router");

var Routes = (
  <Route handler={require("./layout/shell")}>
    <DefaultRoute name="Home" handler={require("./home/home")} />
  </Route>
);

module.exports = Routes;
