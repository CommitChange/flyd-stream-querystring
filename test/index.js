import flyd from 'flyd'
import flyd_queryString from '../'
import assert from 'assert'

suite('flyd-stream-querystring')

test('it loads an initial query string value', () => {
  window.history.pushState({}, null, '?xx=123')
  const s = flyd.stream()
  flyd_queryString('xx', s)
  assert.equal('123', s())
})

test('it sets a new query from a stream', () => {
  const s = flyd.stream()
  flyd_queryString('yy', s)
  s(420)
  assert(/\yy=420/.test(location.href))
})

test('it changes the existing query string correctly', () => {
  window.history.pushState({}, null, '?zz=123')
  const s = flyd.stream()
  flyd_queryString('zz', s)
  s(456)
  assert(/\?zz=456$/.test(location.href))
})

test('it can set multiple query string streams', () => {
  window.history.pushState({}, null, '?zz=123')
  const s1 = flyd.stream(), s2 = flyd.stream()
  flyd_queryString('s1', s1)
  flyd_queryString('s2', s2)
  s1(1); s2(2); s1(3)
  assert(/s1=3&s2=2/.test(location.href))
})
