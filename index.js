var through = require('pull-through')

module.exports = function split (matcher, mapper) {
  var soFar = ''
  if('function' === typeof matcher)
    mapper = matcher, matcher = null
  if (!matcher)
    matcher = '\n'

  return through(function (buffer) { 
    var stream = this
      , pieces = (soFar + buffer).split(matcher)
    soFar = pieces.pop()

    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[i]
      if(mapper) {
        piece = mapper(piece)
        if('undefined' !== typeof piece)
          stream.queue(piece)
      }
      else
        stream.queue(piece)
    }
  },
  function () {
    if(soFar != null)
      this.queue(soFar)  
    this.queue(null)
  })

}

