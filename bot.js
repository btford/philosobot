var irc = require('irc'),
  fs = require('fs'),
  _ = require('underscore');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));

var quotes = [];
var topics = {};

_.each(fs.readdirSync(__dirname + '/quotes'), function (file) {
  if (file.substr(-5) === '.json') {
    var chunk = JSON.parse(fs.readFileSync(__dirname + '/quotes/' + file));
    topics[chunk.topic] = chunk.quotes;
    quotes = quotes.concat(chunk.quotes);
  }
});

var client = new irc.Client(config.server, config.botname, {
  channels: config.channels
});

var explaining = false;

client.addListener('message', function (from, to, message) {
  message = message.toLowerCase();
  if (!explaining && _.include(['!philosophy', '!' + config.botname], message)) {
    explaining = true;
    client.say(to, 'I am knowledgeable in the following areas: ');
    var gr = _.values(_.groupBy(_.keys(topics), function (topic) {
      return topic.substr(0, 1);
    }));

    var explain = function() {
      if (gr.length > 0) {
        client.say(to, gr.shift().join(', '));
        setTimeout(explain, 1300);
      } else {
        explaining = false;
      }
    };

    explain();

  } else if (message.indexOf(config.botname) !== -1) {
    var topicless = true;
    _.each(topics, function (quotes, topic) {
      if (message.indexOf(topic) !== -1) {
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        client.say(to, quote.author + ' once said "' + quote.quote + '"');
        topicless = false;
      }
    });
    if (topicless) {
      var quote = quotes[Math.floor(Math.random() * quotes.length)];
      client.say(to, 'Not sure if this is relevant, but ' + quote.author + ' once said "' + quote.quote + '"');
    }
  }
});
