const serverless = require('serverless-http');
const app = require('../../app');

// Prepend /api so Express routes match when called via Netlify redirect
const handler = serverless(app, {
  request(request) {
    request.url = '/api' + request.url;
  }
});

module.exports = { handler };
