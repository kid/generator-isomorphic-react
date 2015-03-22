"use strict";

require("es6-promise").polyfill();
require("isomorphic-fetch");

var React = require("react");

var Home = React.createClass({
  statics: {
    fetchData() {
      return fetch("http://localhost:8080/api/hello")
        .then(res => res.json())
        .catch(error => { throw new Error(error); });
    }
  },

  getInitialState() {
    return {
      hello: this.props.data.home.hello
    };
  },

  render() {
    return (
      <h1>Hello, {this.state.hello}!</h1>
    );
  }
});

module.exports = Home;
