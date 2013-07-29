var test = require('tape')
var pull = require('pull-stream')
var split = require('../')

test('read this file', function (t) {

  var fs = require('fs')
  var file = fs.readFileSync(__filename).toString()
  var lines = file.split('\n')
  var i = 0, block = 300

  pull.pipeableSource(function () {
    return function (end, cb) {
      if (i > file.length)
        cb(true)
      else {
        var _i = i
        i += block
        cb(null, file.substring(_i, _i + block))
      }
    }
  })()
  .pipe(split())
  .pipe(pull.writeArray(function (err, array){
    t.equal(array.length, lines.length)
    t.deepEqual(array, lines)
    t.end()
  }))
})

//haoeunhoeu
