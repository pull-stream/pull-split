# pull-split

[split](https://github.com/dominictarr/split) ported to
[pull-stream](https://github.com/dominictarr/pull-stream) style.

## Example

``` js
var pull = require('pull-stream')
var split = require('pull-split')

pull(
  textStream
  split(),
  output
)
```

if the textStream is buffers, and contain UTF8
(it probably will if you have german or chinese friends, etc)
then you MUST use this with `pull-utf8-decoder`

``` js
var pull = require('pull-stream')
var split = require('pull-split')
var utf8 = require('pull-utf8-decoder')

pull(
  textStream
  utf8(),
  split(),
  output
)
```

## License

MIT

