
# flyd-stream-querystring

Flyd module for taking a stream of values and pushing them into the URL querystring, using any key that you want. You may do this with as many streams as you want simultaneously. Also, the values from the URL querystring will pushed to the streams on pageload, if present. This is useful for storing and tracking UI state in the URL to be restored on pageload (like for searching, filtering, or tracking what page they are on).

__Signature__

`String -> Stream a -> Stream a`

(This function only returns the stream that you give it, and nothing new; it only creates a side effect in the url)

__Usage__

```javascript
const flyd = require('flyd')
const flyd_queryString = require('flyd-stream-querystring')

location.search // -> ""

const s1 = flyd.stream(), s2 = flyd.stream()
flyd_queryString('finn', s1)
flyd_queryString('jake', s2)

s1('human')
location.search // -> "?finn=human"
s2('dog')
location.search // -> "?finn=human&jake=dog"
s1('human-boy') 
location.search // -> "?finn=human-boy&jake=dog"

Pushing empty string or null to a querystring stream makes the value blank
s1(null)
location.search // -> "?finn=&jake=dog"

Pushing undefined to a querystring stream removes it from the url
s1(undefined)
location.search // -> "?jake=dog"
```

