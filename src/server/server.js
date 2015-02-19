"use strict";

var express = require("express");
var path = require("path");

var React = require("react");
var Router = require("react-router");
var routes = require("../client/routes");

var server = express();

server.use("/assets", express.static(path.join(__dirname, "assets")));

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

  // Render <head> to string
  //var head = React.renderToStaticMarkup(Head({title: title}));

  // Write the response
  res.write("<html>");
  //res.write(head);
  res.write("<body>");
  res.write(content);
  res.write("</body>");

  // In development, the compiled javascript is served by a WebpackDevServer, which lets us "hot load" scripts in for live editing.
  if (process.env.NODE_ENV === "development") {
    res.write("<script src=\"http://localhost:9090/build/assets/client.js\" defer></script>");
  }

  // In production, we just serve the pre-compiled assets from the /build/assets directory
  if (process.env.NODE_ENV === "production") {
    res.write("<script src=\"assets/client.js\" defer></script>");
  }

  res.write("</html>");
  res.end();
});

var port = process.env.PORT || 8080;
server.listen(port);

if (process.env.NODE_ENV === "development") {
  console.log("server.js is listening on port " + port);
}
