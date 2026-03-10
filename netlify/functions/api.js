const serverless = require('serverless-http');
const app = require('../../app');

// Strip the /.netlify/functions/api prefix and replace with /api
// so Express routes like /api/technicians match correctly
const handler = serverless(app, {
  request(request) {
    request.url = request.url.replace(/^\/.netlify\/functions\/api/, '/api');
  }
});

module.exports = { handler };
