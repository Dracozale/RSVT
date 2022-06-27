const http = require('http');
const app = require('./app');

const port = process.port || 2911;

const server = http.createServer(app);

server.listen(port);