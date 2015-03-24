"use strict";

import React from "react";
import { addons as Addons } from "react/addons";
var PureRenderMixin = Addons.PureRenderMixin;

/**
 * Only used server side
 */
var Head = React.createClass({
  displayName: "Head",

  mixins: [PureRenderMixin],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    scripts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    stylesheets: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  render() {
    var scripts = {};
    var stylesheets = {};
    
    this.props.scripts.forEach((url, index) => (
      stylesheets["script-" + index] = <script src={url} defer></script>
    ));

    this.props.stylesheets.forEach((url, index) => (
      stylesheets["stylesheet-" + index] = <link href={url} rel="stylesheet" />
    ));

    scripts = Addons.createFragment(scripts);
    stylesheets = Addons.createFragment(stylesheets);

    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        {scripts}
        {stylesheets}
      </head>
    );
  }
});

export default Head;
