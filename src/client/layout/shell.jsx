"use strict";

var React = require("react");
var Title = require("react-document-title");
var RouteHandler = require("react-router").RouteHandler;

var Shell = React.createClass({
  render: function() {
    return (
      <Title title="My App">
        <div className="row">
          <div className="small-12 columns">
            <RouteHandler />
          </div>
        </div>
      </Title>
    );
  }
});

module.exports = Shell;
