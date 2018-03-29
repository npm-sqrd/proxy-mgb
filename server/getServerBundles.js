const fs = require('fs');
const axios = require('axios');
const path = require('path');
const components = require('./service-config.json');

const bundles = [];
const fetchBundles = (type) => {
  Object.keys(components).forEach((elem) => {
    const url = type === 'server' ? `${components[elem].url}/${components[elem].serverBundle}` : `${components[elem].url}/${components[elem].clientBundle}`;
    const bundle = type === 'server' ? components[elem].serverBundle : components[elem].clientBundle;
    const request = {
      method: 'GET',
      url,
      responseType: 'stream',
    };
    axios(request).then((res) => {
      res.data.pipe(fs.createWriteStream(path.join(__dirname, `/dist/${type}-bundles/${bundle}`))).on('finish', () => {
        if (type === 'server') {
          bundles.push(require(`./dist/${type}-bundles/${bundle}`).default);
        }
      });
    }).catch(err => console.error(err));
  });
};

fetchBundles('server');
fetchBundles('client');

module.exports = bundles;
