var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelp = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {

  if (req.method === "GET") {
    if (req.url === "/") {

      fs.readFile('./public/index.html', function(err, data){
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200, httpHelp.headers);
        res.end(data);
      });

    } else {
      res.writeHead(404, httpHelp.headers);
      res.end("Nope");
    }
  }

  // res.end(archive.paths.list);
};
