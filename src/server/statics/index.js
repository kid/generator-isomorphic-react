"use strict";

function register(server, options, next) {
  require("./favicon")(server);
  require("./assets")(server);

  next();
}

register.attributes = {
  pkg: {
    name: "statics",
    version: require("../../../package.json").version,
  }
};

module.exports.register = register;

