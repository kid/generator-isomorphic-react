"use strict";

var express = require("express");
var path = require("path");

var React = require("react");
var ReactDocumentTitle = require("react-document-title");
var Router = require("react-router");

var head = React.createFactory(require("../client/layout/head"));
var routes = require("../client/routes");

var server = express();

server.use("/assets", express.static(path.join(__dirname, "assets")));

server.use("/favicon.ico", function(req, res) {
  res.set("Content-Type", "image/x-icon");
  res.end();
});

server.use(function(req, res) {
  // We customize the onAbort method in order to handle redirects
  var router = Router.create({
    routes: routes,
    location: req.path,
    onAbort: function defaultAbortHandler(abortReason) {
      if (abortReason && abortReason.to) {
        res.redirect(301, abortReason.to);
      } else {
        res.redirect(404, "404");
      }
    }
  });

  var content = "";

  // Run the router, and render the result to string
  router.run(function (Handler, state) {
    content = React.renderToString(React.createElement(Handler, {
      routerState: state,
      environment: "server"
    }), null);
  });

  var urlPrefix = process.env.NODE_ENV === "development" ? "http://localhost:9090/build/" : "";
  var headContent = React.renderToStaticMarkup(head({
    title: ReactDocumentTitle.rewind(),
    scripts: [ urlPrefix + "assets/client.js" ],
    stylesheets: [ urlPrefix + "assets/client.css" ]
  }));

  // Write the response
  res.write("<!doctype html>");
  res.write("<html>");
  res.write(headContent);
  res.write("<body>");
  res.write(content);
  res.write("</body>");
  res.write("</html>");
  res.end();
});

var port = process.env.PORT || 8080;
server.listen(port);

if (process.env.NODE_ENV === "development") {
  console.log("server.js is listening on port " + port);
}
