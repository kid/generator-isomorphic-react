"use strict";

import Path from "path";

export default function (server) {
  server.route({
    method: "GET",
    path: "/assets/{path*}",
    handler: {
      directory: {
        path: Path.join(__dirname, "assets"),
        listing: false,
        index: false
      }
    },
    config: {
      cache: {
        expiresIn: 86400000,
        privacy: "public"
      }
    }
  });
}
