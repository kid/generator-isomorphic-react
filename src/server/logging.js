"use strict";

var morgan = require("morgan");

module.exports = function(server) {
  server.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
};
