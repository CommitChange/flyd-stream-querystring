'use strict';

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _flyd2.default.curryN(2, function (key, stream) {
  var query = _qs2.default.parse(location.search.replace('?', ''));
  _flyd2.default.scan(function (query, val) {
    query = _qs2.default.parse(location.search.replace('?', ''));
    query[key] = val;
    window.history.pushState({}, null, '?' + _qs2.default.stringify(query));
    return query;
  }, query, stream);
  if (query[key]) stream(query[key]);
  return stream;
});

