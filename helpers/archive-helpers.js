var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var httpHelp = require('../web/http-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'public' : path.join(__dirname, '../web/public')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(res, callback){
  // open sites.txt and convert into array

  httpHelp.serveAssets(res, "../web/archives/sites.txt", function(data) {
    data = data.toString();
    var urls = data.split("\n").slice(0,-1);
    callback(urls);
  });
};

exports.isUrlInList = function(res, url, callback){
  // iterate through readListOfUrls and check if url present
  exports.readListOfUrls(res, function(urls) {
      var isPresent = false;
      for (var i = 0; i < urls.length; i++) {
        if (urls[i] === url) {
          isPresent = true;
        }
      }
      callback(isPresent);
  });
};

exports.addUrlToList = function(url){
  // add user provided url to sites.txt
  //
  // research fs write file
  fs.appendFile('../web/archives/sites.txt', url+"\n");
};

exports.isURLArchived = function(url, callback){
  fs.readdir('../web/archives/sites', function(err, files){
    var isArchived = false;
    for (var i = 0; i < files.length; i++) {
      if (files[i] === url+'.html') {
        isArchived = true;
      }
    }
    callback(isArchived);
  });
};

exports.downloadUrls = function(callback){
  fs.readFile('../web/archives/sites.txt', function(err, data){
    if (err) {
      console.log('Error:', err);
      return;
    }
    // convert str data to array
    data = data.toString();
    var urls = data.split("\n").slice(0,-1);

    // iterate through urls
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      callback(url);

    }
    //   check if each url is archived
    //     if not - download it

  });
  // iterate through sites.txt


  //   if not archived
  //     download into sites/
};
