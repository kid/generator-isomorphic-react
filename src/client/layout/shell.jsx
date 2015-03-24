"use strict";

import React from "react";
import Title from "react-document-title";
import { RouteHandler } from "react-router";
import Trigger from "react-foundation-apps/lib/trigger";
import Offcanvas from "react-foundation-apps/lib/offcanvas";

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

export default Shell;
