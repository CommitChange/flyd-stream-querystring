import flyd from 'flyd'
import qs from 'qs'

module.exports = key => {
  const query = qs.parse(location.search.replace('?', ''))
  const stream = flyd.stream()
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
}
