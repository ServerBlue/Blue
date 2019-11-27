
'use strict';

const http = require('http');
const fs = require('fs');
const DIR = process.cwd();
const path = require('path');
const STATIC = path.join(DIR, 'static'); //fix
//const API = path.join(DIR, 'api'); //api call

const HTTP_PORT = 8080;
const HTTP_HOST = '127.0.0.1';
const INDEX = 'index.html';
const server = http.createServer((req, res) => {
  let url = decodeURI(req.url);
  if (url[url.length - 1] === '/') url += INDEX;
  console.log(url);
  //const fileName = path.join(DIR, 'static', url); //vulnerable
  const fileName = path.resolve(STATIC, './' + url); //fix
  if (!fileName.startsWith(STATIC)) { //fix
    res.end('Are you trying to hack me?'); //fix
    return;
  }
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      res.end('Error 404: File not found');
      return;
    }
    res.end(data);
  });
});

server.listen(HTTP_PORT);

console.log(`Server started at http://${HTTP_HOST}:${HTTP_PORT}/`);
