// script for scraping quotes from Quotations Page site
var url = require('url'),
  _ = require('underscore'),
  fs = require('fs'),
  querystring = require('querystring');

var jQuerify = require('./util/jquerify.js').jQuerify,
  fsutil = require('./util/fsutil.js');

var parseSet = function (setName, cb) {
  jQuerify({
    host: 'quotationspage.com',
    path: setName
  }, function ($) {
    var cards = [];
    var topicName = setName.substr(10, setName.length - 11).toLowerCase().replace('+', ' ');

    $('dt.quote a')
      .each(function (i, elt) {
        cards.push({
          quote: $(elt).html()
        });
      });

    $('dd.author b a')
      .each(function (i, elt) {
        cards[i].author = $(elt).html();
      });
    console.log(__dirname + '/quotes/' + topicName + '.json');
    fsutil.writeJSON(__dirname + '/quotes/' + topicName.replace(' ', '_') + '.json', {
      topic: topicName,
      quotes: cards
    });
    cb();
  });
};

process.on('message', function (m) {
  parseSet(m.set, function () {
    process.send({done: true});
  });
});

process.send({start: true});
