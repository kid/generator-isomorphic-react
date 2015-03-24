"use strict";

function fetchData(routes, params) {
  var data = {};
  var errors = {};
  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params)
        .then(d => {
          data[route.name] = d;
        })
        .catch(e => {
          errors[route.name] = e;
        });
    })
  )
  .then(() => data)
  .catch(() => errors);
}

export default fetchData;
