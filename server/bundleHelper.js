const fs = require('fs');
const axios = require('axios');
const path = require('path');
const services = require('../service-config')

const getBundles = (bundleType, components) => {
  Object.keys(components).forEach(elem => {
    if (type === 'client')  {
      const url = `${components[elem].url}/${component[item].clientBundle}`;
      const bundle = component[item].clientBundle;
      const request = {
        method: 'GET',
        url: url,
        responseType: 'stream',
      };
      axios(request).then(res => {
        res.data.pipe(fs.createWriteStream(path.join(__dirname, `/dist/${bundleType}/${bundle}`)));
      }).catch(err => {
        console.error(err);
      });
    } else {
      const url = `${components[elem].url}/${component[item].serverBundle}`;
      const bundle = component[item].serverBundle;
      const request = {
        method: 'GET',
        url: url,
        responseType: 'stream',
      };
      axios(request).then(res => {
        res.data.pipe(fs.createWriteStream(path.join(__dirname, `/dist/${bundleType}/${bundle}`)));
      }).catch(err => {
        console.error(err);
      });
    }
  });
};
getBundles(services, 'client');
getBundles(services, 'server');