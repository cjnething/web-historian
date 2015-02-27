var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request');

archive.downloadUrls(function(url) {
  console.log("processing", url);
  archive.isURLArchived(url, function(isArchived){
    if (!isArchived) {
      // download the file if not archived
      console.log('getting', url);
      httpRequest.get(url, archive.paths['archivedSites'] + '/' + url + '.html', function(){});
    }
  });
});
// };

// go through the list, if not archived, take a snapshot
