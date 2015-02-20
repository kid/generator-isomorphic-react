"use strict";

function sayHello(req, res) {
  res.json({hello: "world"});
}

module.exports = {
  sayHello
};
