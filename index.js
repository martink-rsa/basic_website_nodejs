const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer(function(req, res) {
    const q = url.parse(req.url, true);
    let filename;
    if (q.pathname === '/') {
      filename = './index.html';
    } else {
      filename = '.' + q.pathname + '.html';
    }
    fs.readFile(filename, function(err, data) {
      if (err) {
        const errorPath = './404.html';
        fs.readFile(errorPath, function(err, data) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
