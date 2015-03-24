"use strict";

import React from "react";
import { Route, DefaultRoute } from "react-router";

var Routes = (
  <Route handler={require("./layout/shell")}>
    <DefaultRoute name="home" handler={require("./home/home")} />
  </Route>
);

export default Routes;
