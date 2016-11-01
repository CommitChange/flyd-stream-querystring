import flyd from 'flyd'
import qs from 'qs'

module.exports = flyd.curryN(2, (key, stream) => {
  const query = qs.parse(location.search.replace('?', ''))
  flyd.scan(
    (query, val) => {
      query = qs.parse(location.search.replace('?', ''))
      query[key] = val
      window.history.pushState({}, null, '?' + qs.stringify(query))
      return query
    }
  , query
  , stream
  )
  if(query[key]) stream(query[key])
  return stream
})
