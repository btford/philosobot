// script for scraping quotes from Quotations Page site
var url = require('url'),
  _ = require('underscore'),
  querystring = require('querystring'),
  cp = require('child_process');

var jQuerify = require('./util/jquerify.js').jQuerify,
  fsutil = require('./util/fsutil.js');

var parseSets = function (cb) {
  jQuerify({
    host: 'quotationspage.com',
    path: '/subjects/'
  }, function ($) {
    var sets = [];
    $('#maintable')
      .find('a[href^="/subjects/"]')
      .each(function (i, elt) {
        var set = $(elt).attr('href');
        if (set.length > 10) {
          sets.push(set);
        }
      });

    console.log('Found ' + sets.length + ' sets.');
    spawnWorkers(sets, cb);
  });
};

// launch some child processes to do our bidding
var spawnWorkers = function (sets, cb) {
  // multithread this fucker
  var numCPUs = require('os').cpus().length;
  var activeWorkers = numCPUs;

  for (var i = 0; i < numCPUs; i += 1) {
    (function() {
      var n = cp.fork(__dirname + '/slave.js');
      n.on('message', function () {
        var set;
        if (sets.length > 0) {
          set = sets.shift();
          console.log('dispatching ' + n.pid + ' to parse ' + set);
          n.send({
            set: set
          });
        } else {
          activeWorkers -= 1;
          n.kill();
        }
      });
    }());
  }
};

parseSets(function () {
  console.log('done');
});
