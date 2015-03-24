"use strict";

export function register(server, options, next) {
  server.route({
    method: "GET",
    path: "/api/hello",
    handler: function (request, reply) {
      reply({
        hello: "world"
      });
    }
  });

  next();
}

register.attributes = {
  pkg: {
    name: "api",
    version: require("../../../package.json").version,
  }
};
