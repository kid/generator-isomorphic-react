"use strict";

module.exports = function(server) {
  server.use("/favicon.ico", function(req, res) {
    res.set("Content-Type", "image/x-icon");
    res.end();
  });
};
