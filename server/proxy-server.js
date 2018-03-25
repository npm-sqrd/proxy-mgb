const http = require('http');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOM = require('react-dom/server');

const render = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDOM.renderToString(component);
  });
}


http.createServer((req, res) => {
  const { method, url } = req;
  if (method === 'GET' && url === '/') {
    // do something
  }
}).listen(5000);