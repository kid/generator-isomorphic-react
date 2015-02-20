"use strict";

var React = require("react");
var ReactDocumentTitle = require("react-document-title");
var Router = require("react-router");

var head = React.createFactory(require("../client/layout/head"));
var routes = require("../client/routes");

module.exports = function(server) {
  server.use(function(req, res) {
    // We customize the onAbort method in order to handle redirects
    var router = Router.create({
      routes: routes,
      location: req.path,
      onAbort: function defaultAbortHandler(abortReason) {
        if (abortReason && abortReason.to) {
          res.redirect(301, abortReason.to);
        }
        else {
          res.redirect(404, "404");
        }
      }
    });

    
    // Run the router, and render the result to string
    var bodyContent = "";
    router.run(function(Handler, state) {
      bodyContent = React.renderToString(React.createElement(Handler, {
        routerState: state,
        environment: "server"
      }), null);
    });

    // In development mode, we serve static files from the hot-load-server.
    var urlPrefix = process.env.NODE_ENV === "development" ? "http://localhost:9090/build/" : "";
    var headContent = React.renderToStaticMarkup(head({
      title: ReactDocumentTitle.rewind(),
      scripts: [urlPrefix + "assets/client.js"],
      stylesheets: [urlPrefix + "assets/client.css"]
    }));

    // Write the response
    res.write("<!doctype html>");
    res.write("<html>");
    res.write(headContent);
    res.write("<body>");
    res.write(bodyContent);
    res.write("</body>");
    res.write("</html>");
    res.end();
  });
};
