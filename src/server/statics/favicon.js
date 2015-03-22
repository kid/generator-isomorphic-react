"use strict";

module.exports = function(server) {
  server.route({
    method: "GET",
    path: "/favicon.ico",
    handler: function (request, reply) {
      reply().header("Content-Type", "image/i-icon");
    },
    config: {
      cache: {
        expiresIn: 86400000,
        privacy: "public"
      }
    }
  });
};
