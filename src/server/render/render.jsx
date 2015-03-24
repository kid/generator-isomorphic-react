"use strict";

import Fs from "fs";
import Boom from "boom";
import Path from "path";

import React from "react";
import ReactDocumentTitle from "react-document-title";
import Router from "react-router";

import Head from "../../client/layout/head";
import routes from "../../client/routes";

import fetchData from "../../common/utils/fetch-data";

// In development mode, we serve static files from the hot-load-server.
var assets = __HOT__ ? [
    "client.js",
    "client.css"
  ] : Fs.readdirSync(Path.join(__dirname, "assets"));
var prefix = __HOT__ ? "http://localhost:9090/build/assets/" : "assets/";
var scripts = assets.filter(f => f.endsWith(".js")).map(f => prefix + f);
var stylesheets = assets.filter(f => f.endsWith(".css")).map(f => prefix + f);

module.exports = function (server) {
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
            var bodyContent = React.renderToString(<Handler data={data} />);

            var headContent = React.renderToStaticMarkup(
              <Head 
                title={ReactDocumentTitle.rewind()}
                scripts={scripts}
                stylesheets={stylesheets} />
            );

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
};

