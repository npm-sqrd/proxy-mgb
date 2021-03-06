require('newrelic');
const http = require('http');
const serverBundles = require('./getServerBundles');
const { postData, fetchData } = require('./clientHelpers');
const render = require('./renderHtml');
const fs = require('fs');
const path = require('path');

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
      const bundleStream = fs.createReadStream(path.join(__dirname, './dist/client-bundles/res-bundle.js'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      bundleStream.pipe(res);
    } else if (route[0] === 'restaurants' && route[2] === 'reservations') {
      fetchData(res, url);
    }
  } else if (method === 'POST' && url === '/reservations') {
    postData(res, req, url);
  }
});

module.exports = app;
