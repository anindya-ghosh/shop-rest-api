const env = require('./env');
// set env into process
process.env = Object.assign(process.env || {}, env);

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);