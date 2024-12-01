require('dotenv').config();

var video = process.env.VIDEO_URL;

var http = require('http');
var url = require('url');
var fs = require('fs');

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var path = q.pathname === '/' ? '/index' : q.pathname;
    var filename = '.' + path + '.html';
    console.log(filename);
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('404 Not Found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.write(video);
      return res.end();
    });
  })
  .listen(8080);
