
# flyd-stream-querystring

Flyd module for creating a stream of values and pushing them into the URL querystring, using any key that you want. You may do this with as many streams as you want simultaneously. Also, the values from the URL querystring will pushed to the streams on pageload, if present. This is useful for storing and tracking UI state in the URL to be restored on pageload (like for searching, filtering, or tracking what page they are on).

__Signature__

`String -> Stream a`

This module exports a single function that takes a String (a query parameter key name) and returns a stream whose values will be bound to that querystring parameter.

__Usage__

```javascript
const flyd = require('flyd')
const flyd_queryString = require('flyd-stream-querystring')

location.search // -> ""

const finn = flyd_queryString('finn')
const jake = flyd_queryString('jake')

finn('human')
location.search // -> "?finn=human"
jake('dog')
location.search // -> "?finn=human&jake=dog"
finn('human-boy') 
location.search // -> "?finn=human-boy&jake=dog"

// Pushing empty string or null to a querystring stream makes the value blank
finn(null)
location.search // -> "?finn=&jake=dog"

// Pushing undefined to a querystring stream removes it from the url
finn(undefined)
location.search // -> "?jake=dog"
```

