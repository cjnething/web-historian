var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelp = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function (req, res) {

  if (req.method === "GET") {
    if (req.url === "/") {
      httpHelp.serveAssets(res, archive.paths['public'] + '/index.html', function(data){
        res.writeHead(200, httpHelp.headers);
        res.end(data);
      });

    }
    else if (req.url === "/styles.css") {
      httpHelp.serveAssets(res, archive.paths['public'] + '/styles.css', function(data){
        httpHelp.headers['Content-Type'] = "text/css";
        res.writeHead(200, httpHelp.headers);
        res.end(data);
      });
    }

    else if (req.url.indexOf('/archives/sites') !== -1) {
      // then user is submitting a GET request for a cached site
      httpHelp.headers['Content-Type'] = "text/html";
      res.writeHead(200, httpHelp.headers);
      res.end(req.url);
    }

    else {
      res.writeHead(404, httpHelp.headers);
      res.end("Nope");
    }
  }
  // handle POST requests
  if (req.method === "POST") {
    var result = '';
    req.on("data", function(chunk) {
      result += chunk;
    });
    req.on("end", function() {
      url = result.slice(4);

      archive.isUrlInList(res, url, function(isPresent){
        if(!isPresent) {
          archive.addUrlToList(url);
        } else {
          // check to see if url is archived
          archive.isURLArchived(url, function(isArchived){
            if (isArchived) {
              // serve the page
            } else {
              // serve up loading.html
              httpHelp.serveAssets(res, './public/loading.html', function(data){
                httpHelp.headers['Content-Type'] = "text/html";
                res.writeHead(200, httpHelp.headers);
                res.end(data);
              })
            }
          });
        }
      })

      archive.isURLArchived(url, function(isArchived) {
         console.log(isArchived);
      });

      // console.log("Is test1 present", archive.isUrlInList(res, "www.test1.com"));
      // if (archive.isUrlInList(res, result)) {
      //   // send back archived site
      // } else {
      //   archive.addUrlToList(result);
      // }
      // httpHelp.headers['Content-Type'] = "text/html";
      // res.writeHead(200, httpHelp.headers);
      // res.end(result);
    })
  }

  // res.end(archive.paths.list);
};
