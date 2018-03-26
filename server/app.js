const http = require('http');
const serverBundles = require('./getServerBundles');
const { postData, fetchData, getBundle } = require('./clientHelpers');
const render = require('./renderHtml');

// if (typeof window === 'undefined') {
//   global.window = {};
// }

const app = http.createServer((req, res) => {
  const { method, url } = req;
  const route = url.slice(1).split('/');
  console.log(url);
  if (method === 'GET') {
    if (route[0] === '') {
      render(res, serverBundles[0]);
    } else if (route[0] === 'res-bundle.js') {
      getBundle(res, url);
    } else if (route[0] === 'restaurants' && route[2] === 'reservations') {
      fetchData(res, url);
    }
  } else if (method === 'POST' && url === '/reservations') {
    postData(res, req, url);
  }
});

module.exports = app;
