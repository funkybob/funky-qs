qs
==

Simple querystring parsing and construction.

Parse
-----

The parse function will return an Object of the terms. Any leading '?' or '#'
will be removed, so it's safe to use on both location.search and location.hash.

    import qs from 'qs';

    // Parse the querystring
    params = qs.parse(window.location.search)

    // Parse the hash
    params = qs.parse(window.location.hash)

Any key that appears more than once in the query string will result in a list
in the result, with the values in order of discovery.

You can pass in an intial state to be updated:

    params = qs.parse(window.location.hash, defaults)

You can also use this to force some values to be always be lists:

    params = qs.parse(..., {names: []})

Parsef
------

Additionally, there's parsef, which will parse a querystring into a FormData instance.

Differences from pares are as follows:

- key order is retained
- repeated keys result in repeated entries in the FormData instance.

Encode
------

Encodes values into a querystring. Can also be used to generate POST data.

Any values which are lists will be handled automatically.

Note: This library does NOT use the idiomatic PHP style of appending [] to
fields that have multiple values.


    import qs from 'qs'

    // results in foo=1&bar=a&bar=b
    qstring = qs.encode({foo: 1, bar: ["a", "b"]})

