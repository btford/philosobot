var fs = require('fs');

exports.mkdir = function (path) {
  try {
    fs.mkdirSync(path);
  }
  catch (e) {}
};

exports.writeJSON = function (path, data) {
  fs.writeFileSync(path, JSON.stringify(data));
};

exports.readJSON = function (path) {
  return JSON.parse(fs.readFileSync(path));
};
