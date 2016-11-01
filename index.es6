import flyd from 'flyd'
import qs from 'qs'

function getQuery() {
  const href = location.href
  const search = href.match(/\?.+$/)
  const query = search ? qs.parse(search[0].replace('?', '')) : {}
  return query
}

module.exports = flyd.curryN(2, (key, stream) => {
  const query = getQuery()
  flyd.scan(
    (query, val) => {
      query = getQuery()
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
