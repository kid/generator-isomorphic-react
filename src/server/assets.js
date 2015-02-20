"use strict";

var path = require("path");
var express = require("express");

module.exports = function(server) {
  server.use("/assets", express.static(path.join(__dirname, "assets")));
};
