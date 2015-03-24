"use strict";

import React from "react";
import Title from "react-document-title";
import { RouteHandler } from "react-router";

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

export default Shell;
