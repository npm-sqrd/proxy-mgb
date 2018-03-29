const redis = require('redis');

const redisClient = redis.createClient('redis://ec2-18-216-34-139.us-east-2.compute.amazonaws.com:6379');

redisClient.on('error', (err) => {
  console.error(err);
});

module.exports = redisClient;
