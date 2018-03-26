const axios = require('axios');
const redisClient = require('./redisClient');

const postData = ((res, req, route) => {
  axios(route, req)
    .then((data) => {
      console.log('data type', data);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(data);
    })
    .catch(() => {
      res.sendStatus = 500;
      res.end();
    });
});

const fetchData = ((res, route) => {
  axios.get(`http://localhost:3005${route}`)
    .then(({ data }) => {
      // console.log('received data back on proxy', data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    })
    .catch(() => {
      res.statusCode = 404;
      res.end();
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
          redisClient.setex(route, 60, dataStr);
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
