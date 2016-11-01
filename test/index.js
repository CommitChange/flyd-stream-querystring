import flyd from 'flyd'
import flyd_queryString from '../'
import assert from 'assert'

suite('flyd-stream-querystring')

test('it loads an initial query string value', () => {
  window.history.pushState({}, null, '?xx=123')
  const s = flyd_queryString('xx')
  assert.equal('123', s())
})

test('it sets a new query from a stream', () => {
  const s = flyd_queryString('yy')
  s(420)
  assert(/\yy=420/.test(location.href))
})

test('it changes the existing query string correctly', () => {
  window.history.pushState({}, null, '?zz=123')
  const s = flyd_queryString('zz')
  s(456)
  assert(/\?zz=456$/.test(location.href))
})

test('it can set multiple query string streams', () => {
  window.history.pushState({}, null, '?zz=123')
  const s1 = flyd_queryString('s1')
  const s2 = flyd_queryString('s2')
  s1(1); s2(2); s1(3)
  assert(/s1=3&s2=2/.test(location.href))
})

test('setting a querystring stream to null makes it blank', () => {
  const s = flyd_queryString('nullo', s)
  s('hi')
  s(null)
  assert(/nullo=$/.test(location.href))
})

test('setting a querystring stream to undefined removes it', () => {
  const s = flyd_queryString('nullo', s)
  s('hi')
  s(undefined)
  assert(!location.href.match(/nullo/))
})
