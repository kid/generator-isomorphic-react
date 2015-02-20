"use strict";

module.exports = function(server, options) {
  server.get(options.prefix + "/hello", require("./hello").sayHello);
};
