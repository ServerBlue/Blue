'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');

const config = require('./config.json');
const { Database } = require('./database.js');
const db = new Database(config.db);

const DIR = __dirname;
const WWW = DIR + '/www/';
const PORT = config.httpPort;
const HOST = '127.0.0.1';

const routing = {
  '/listGroups': async request => {
    const sql = 'SELECT * FROM Groups';
    try {
      const groups = db.query(sql);
      console.dir(groups);
      return groups;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  },
  '/signIn': async request => {
    const { login, password } = request;
    const sql = `SELECT * FROM Users where Name = '${login}'`;
    try {
      const user = db.query(sql);
      console.dir(user);
      return user;
    } catch (err) {
      console.error(err.message);
      return err;
    }
  },
};

const server = http.createServer((req, res) => {
  let uri = decodeURI(req.url);
  if (uri === '/') uri = 'index.html';
  console.log(uri);
  for (let key in routing) {
    if (uri.startsWith(key)) {
      const handler = routing[key];
      const query = url.parse(uri).query || '';
      console.log({ query });
      const parameters = query
        .split('&')
        .map(item => item.split('='));
      const request = Object.fromEntries(parameters);
      handler(request).then(result => {
        res.end(JSON.stringify(result));
      });
      return;
    }
  }
  const fileName = WWW + uri;
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
