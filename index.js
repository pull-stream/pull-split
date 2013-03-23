var through = require('pull-through')
function split (matcher, mapper, reverse) {
  var soFar = ''
  if('function' === typeof matcher)
    mapper = matcher, matcher = null
  if (!matcher)
    matcher = '\n'

  return through(function (buffer) { 
    var stream = this
      , pieces = (
      reverse ? (buffer + soFar) : (soFar + buffer)
    ).split(matcher)
    soFar = reverse ? pieces.shift() : pieces.pop()

    /*
      var max = pieces.length - 1
    
    for (var i = 0; i < pieces.length; i++) {
      var piece = pieces[reverse ? max - i : i]
      if(mapper) {
        piece = mapper(piece)
        if('undefined' !== typeof piece)
          stream.queue(piece)
      }
      else
        stream.queue(piece)
    }
    */
    while(pieces.length)
      stream.queue(reverse ? pieces.pop() : pieces.shift())
  },
  function () {
    if(soFar != null)
      this.queue(soFar)  
    this.queue(null)
  })
}

module.exports = function split (matcher, mapper, reverse) {
  var soFar = ''
  if('function' === typeof matcher)
    mapper = matcher, matcher = null
  if (!matcher)
    matcher = '\n'

  return through(function (buffer) { 
    var stream = this
      , pieces = ( reverse 
        ? buffer + soFar
        : soFar + buffer
      ).split(matcher)

    soFar = reverse ? pieces.shift() : pieces.pop()

    var l = pieces.length
    for (var i = 0; i < l; i++) {
      var piece = pieces[reverse ? l - 1 - i : i ]
      if(mapper) {
        piece = mapper(piece)
        if('undefined' !== typeof piece)
          stream.queue(piece)
      }
      else
        stream.queue(piece)
    }
    //while(pieces.length)
      //stream.queue(reverse ? pieces.pop() : pieces.shift())


  },
  function () {
    if(soFar != null)
      this.queue(soFar)  
    this.queue(null)
  })

}

