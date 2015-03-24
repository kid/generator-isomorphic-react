"use strict";

require("./client.scss");

import React from "react";
import Router from "react-router";

import routes from "./routes";
import fetchData from "../common/utils/fetch-data";

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  fetchData(state.routes, state).then(data => {
    React.render(<Handler data={data} />, document.body);
  });
});
