"use strict";

var React = require("react");
var Title = require("react-document-title");
var RouteHandler = require("react-router").RouteHandler;

var Shell = React.createClass({
  render() {
    console.log("Shell: ", this.props.data);

    return (
      <Title title="My App">
        <div className="row">
          <div className="small-12 columns">
            <RouteHandler {...this.props} />
          </div>
        </div>
      </Title>
    );
  }
});

module.exports = Shell;
