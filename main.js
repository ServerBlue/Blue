'use strict';

const http = require('http');
const fs = require('fs');

const config = require('./config.json');
const { Database } = require('./database.js');
const db = new Database(config.db);

const DIR = __dirname;
const WWW = DIR + '/www/';
const PORT = config.httpPort;
const HOST = '127.0.0.1';

{
  const sql = 'SELECT * FROM Groups';
  try {
    const groups = db.query(sql);
    console.dir(groups);
  } catch (err) {
    console.error(err.message);
    return err;
  }
}

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
