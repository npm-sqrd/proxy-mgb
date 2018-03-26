const axios = require('axios');
const redisClient = require('./redisClient');

const postData = ((res, req, route) => {
  axios.post(`http://localhost:3005${route}`, req)
    .then(({ data }) => {
      const dataStr = JSON.stringify(data);
      redisClient.del(route);
      redisClient.setex(route, 10, dataStr);
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
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(result);
    } else {
      axios.get(`http://localhost:3005${route}`)
        .then(({ data }) => {
          const dataStr = JSON.stringify(data);
          redisClient.setex(route, 10, dataStr);
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
      axios.get(`http://localhost:3005${route}`)
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
