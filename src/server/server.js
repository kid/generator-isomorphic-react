"use strict";

var Hapi = require("hapi");
var Path = require("path");

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "assets")
      }
    }
  }
});

server.connection({
  host: "localhost",
  port: parseInt(process.env.PORT, 10) ||  8080
});

var goodOptions = {
  opsInterval: 1000,
  reporters: [{
    reporter: require("good-console"),
    args: [{
      log: "*",
      error: "*",
      request: "*",
      response: "*"
    }]
  }]
};

server.register([
  {
    register: require("good"),
    options: goodOptions
  },
  {
    register: require("./statics")
  },
  {
    register: require("./api")
  },
  {
    register: require("./render")
  }
], function (err) {
  if (err) {
    console.error("error", err);
  } else {
    server.start(() => console.info("Server started at " + server.info.uri));
  }
});

// require("./rendering")(server);

