const axios = require('axios');
const redisClient = require('./redisClient');
const service = require('./service-config.json');

const postData = ((res, req, route) => {
  axios.post(`${service.Reservations.url}${route}`, req)
    .then(({ data }) => {
      console.log('route1', route);
      console.log(data);
      const dataStr = JSON.stringify(data);
      // redisClient.del(route);
      redisClient.setex(route, 180, dataStr);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(dataStr);
    })
    .catch(() => {
      res.sendStatus = 500;
      res.end();
    });
});

const fetchData = ((res, route) => {
  redisClient.get(route, (err, result) => {
    if (result != null) {
      console.log('route2', route);
      console.log('grabbing from redis');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result);
    } else {
      axios.get(`${service.Reservations.url}${route}`)
        .then(({ data }) => {
          console.log('fetching from the service');
          const dataStr = JSON.stringify(data);
          redisClient.setex(route, 180, dataStr);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(dataStr);
        })
        .catch(() => {
          res.statusCode = 404;
          res.end();
        });
    }
  });
});

const getBundle = ((res, route) => {
  redisClient.get(route, (err, result) => {
    if (result != null) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(JSON.parse(result));
    } else {
      axios.get(`${service[0].url}${route}`)
        .then(({ data }) => {
          const dataStr = JSON.stringify(data);
          redisClient.setex(route, 300, dataStr);
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          res.end(data);
        })
        .catch(() => {
          res.statusCode = 404;
          res.end();
        });
    }
  });
});

module.exports = {
  getBundle,
  fetchData,
  postData,
};
