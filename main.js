'use strict';

const http = require('http');
const fs = require('fs');

const DIR = __dirname;
const WWW = DIR + '/www/';
const PORT = 8080;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  let url = decodeURI(req.url);
  if (url === '/') url = 'index.html';
  console.log(url);
  const fileName = WWW + url;
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.end('Error 404: File not found');
      return;
    }
    res.end(data);
  });
});

server.listen(PORT);

console.log(`Server started at http://${HOST}:${PORT}/`);
