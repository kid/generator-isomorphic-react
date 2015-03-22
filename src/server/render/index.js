"use strict";

function register(server, options, next) {
  require("./render")(server);

  next();
}

register.attributes = {
  pkg: {
    name: "render",
    version: require("../../../package.json").version,
  }
};

module.exports.register = register;

