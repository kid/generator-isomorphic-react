"use strict";

var React = require("react");
var ReactDocumentTitle = require("react-document-title");
var Router = require("react-router");

var head = React.createFactory(require("../client/layout/head"));
var routes = require("../client/routes");

var fetchData = require("../common/utils/fetch-data");

module.exports = function(server) {
  server.get("*", function(req, res) {
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
    router.run(function(Handler, state) {
      fetchData(state.routes, state.params)
        .then(data => {
          var bodyContent = React.renderToString(React.createElement(Handler, {
            data: data
          }), null);

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
        })
        .catch(error => {
          console.log(error);
          res.status(500).send(error);
        });
    });
  });
};
