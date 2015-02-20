"use strict";

require("./client.scss");

var React = require("react");
var Router = require("react-router");

var routes = require("./routes");
var fetchData = require("../common/utils/fetch-data");

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  fetchData(state.routes, state).then(data => {
    React.render(<Handler data={data} />, document.body);
  });
});
