var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelp = require('../web/http-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
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

exports.readListOfUrls = function(res){
  // open sites.txt and convert into array

  return httpHelp.serveAssets(res, "../web/archives/sites.txt", function(data) {
    data = data.toString();
    var urls = data.split("\n").slice(0,-1);
    console.log(urls);
    return urls;
  });
};

exports.isUrlInList = function(res, url){
  // iterate through array in sites.txt
  //   see if the url is in the list
  var urls = exports.readListOfUrls(res);
};

exports.addUrlToList = function(url){
  // add user provided url to sites.txt
};

exports.isURLArchived = function(url){
  // looks in sites to see if url present
};

exports.downloadUrls = function(){
  // iterate through sites.txt
  //   if not in sites.txt
  //     download into sites/
};
