"use strict";

var React = require("react");
var PureRenderMixin = require("react/addons").addons.PureRenderMixin;

var Head = React.createClass({
  displayName: "Head",

  mixins: [PureRenderMixin],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    urlPrefix: React.PropTypes.string.isRequired
  },

  render: function() {
    var stylesheet = this.props.urlPrefix + "assets/client.css";
    return (
      <head>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link href={stylesheet} rel="stylesheet" />
      </head>
    );
  }
});

module.exports = Head;
