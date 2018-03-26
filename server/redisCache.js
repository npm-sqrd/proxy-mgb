const redisClient = require('./redisClient');
const services = require('./service-config');

const checkCache = (res, endpoint) => {
  redisClient.get(endpoint, (err, data) => {
    if (data != null) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(JSON.parse(data));
    } else if (err) {
      res.writeHead(500);
      res.end();
    }
  });
};

module.exports = checkCache;
