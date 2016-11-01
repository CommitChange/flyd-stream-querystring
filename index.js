'use strict';

var _flyd = require('flyd');

var _flyd2 = _interopRequireDefault(_flyd);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getQuery = function getQuery() {
  return _qs2.default.parse(location.search.replace('?', ''));
};

module.exports = _flyd2.default.curryN(2, function (key, stream) {
  var query = getQuery();
  _flyd2.default.scan(function (query, val) {
    query = getQuery();
    query[key] = val;
    window.history.pushState({}, null, '?' + _qs2.default.stringify(query));
    return query;
  }, query, stream);
  if (query[key]) stream(query[key]);
  return stream;
});

