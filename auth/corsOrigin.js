function corsOrigin () {
  const whitelist = [
    'http://local.fri.is:1234',
    'http://local.fri.is:3010',
    'https://felagatal.fri.is'
  ]

  return function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed'))
    }
  }
}

module.exports = corsOrigin
