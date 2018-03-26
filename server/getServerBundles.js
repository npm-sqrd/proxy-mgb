const fs = require('fs');
const axios = require('axios');
const path = require('path');
const components = require('./service-config.json');

const bundles = [];
const fetchBundles = () => {
  Object.keys(components).forEach((elem) => {
    const url = `${components[elem].url}/${components[elem].serverBundle}`;
    const bundle = components[elem].serverBundle;
    const request = {
      method: 'GET',
      url,
      responseType: 'stream',
    };
    axios(request).then((res) => {
      res.data.pipe(fs.createWriteStream(path.join(__dirname, `/dist/bundles/${bundle}`))).on('finish', () => {
        bundles.push(require(`./dist/bundles/${bundle}`).default);
      });
    }).catch(err => console.error(err));
  });
};

fetchBundles();

module.exports = bundles;
