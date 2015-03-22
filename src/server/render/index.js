"use strict";

var Fs = require("fs");
var Boom = require("boom");
var Path = require("path");

var React = require("react");
var ReactDocumentTitle = require("react-document-title");
var Router = require("react-router");

var head = React.createFactory(require("../../client/layout/head"));
var routes = require("../../client/routes");

var fetchData = require("../../common/utils/fetch-data");

function register(server, options, next) {
  // In development mode, we serve static files from the hot-load-server.
  var assets = Fs.readdirSync(Path.join(__dirname, "assets"));
  var prefix = __HOT_MODE__ ? "http://localhost:9090/build/assets/" : "assets/";
  var scripts = assets.filter(f => f.endsWith(".js")).map(f => prefix + f);
  var stylesheets = assets.filter(f => f.endsWith(".css")).map(f => prefix + f);

  server.route({
    method: "GET",
    path: "/{path*}",
    handler: function (request, reply) {
      // We customize the onAbort method in order to handle redirects
      var router = Router.create({
        routes: routes,
        location: request.params.path,
        onAbort: function defaultAbortHandler(abortReason) {
          if (abortReason && abortReason.to) {
            return reply.redirect(abortReason.to);
          } else {
            return reply(Boom.notFound());
          }
        }
      });

      // Run the router, and render the result to string
      router.run(function (Handler, state) {
        fetchData(state.routes, state.params)
          .then(data => {
            var bodyContent = React.renderToString(React.createElement(Handler, {
              data: data
            }), null);

            var headContent = React.renderToStaticMarkup(head({
              title: ReactDocumentTitle.rewind(),
              scripts: scripts,
              stylesheets: stylesheets
            }));

            // Write the response
            var content = [
              "<!doctype html>",
              "<html>",
              headContent,
              "<body>",
              bodyContent,
              "</body>",
              "</html>"
            ];

            return reply(content.join(""));
          })
          .catch(error => {
            console.error(error);
            reply(Boom.wrap(error));
          });
      });
    }
  });

  next();
}

register.attributes = {
  pkg: {
    name: "render",
    version: require("../../../package.json").version,
  }
};

module.exports.register = register;

