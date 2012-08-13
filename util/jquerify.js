// This is a terrible way to do things
exports.jQuerify = function (req, cb) {
  var jsdom = require('jsdom').jsdom,
    http = require('http');

  http.get(req, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      jsdom.env({
        html: data,
        scripts: ['http://code.jquery.com/jquery-1.7.1.min.js']
      }, function (err, window) {
        if (err) {
          //TODO: handle errors
          console.log(err);
        }
        cb(window.jQuery);
      });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};
