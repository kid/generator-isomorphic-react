"use strict";

var express = require("express");
var server = express();

// Note that favicon is done first because we don't want theses requests loggued
require("./favicon")(server);
require("./logging")(server);
require("./assets")(server);

require("./api/routes")(server, { prefix: "/api" });
require("./rendering")(server);

var port = process.env.PORT || 8080;
server.listen(port);

if (process.env.NODE_ENV === "development") {
  console.log("server.js is listening on port " + port);
}
