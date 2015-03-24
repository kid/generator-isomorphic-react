"use strict";

export default function (server, options) {
  server.get(options.prefix + "/hello", require("./hello").sayHello);
};
