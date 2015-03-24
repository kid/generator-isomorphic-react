"use strict";

var React = require("react");
var Title = require("react-document-title");
var RouteHandler = require("react-router").RouteHandler;
var Trigger = require("react-foundation-apps/lib/trigger");
var Offcanvas = require("react-foundation-apps/lib/offcanvas");

var Shell = React.createClass({
  render() {
    console.log("Shell: ", this.props.data);

    return (
      <Title title="My App">
        <div>
          <Offcanvas id="left-offcanvas" position="left">
            <Trigger close="">
              <a className="close-button">&times;</a>
            </Trigger>
            <br />
            <p>This is offcanvas menu</p>
          </Offcanvas>
          <div className="grid-frame">
            <div className="small-12 columns">
              <Trigger toggle="left-offcanvas">
                <a className="button">Menu</a>
              </Trigger>
          
              <RouteHandler {...this.props} />
            </div>
          </div>
        </div>
      </Title>
    );
  }
});

module.exports = Shell;
