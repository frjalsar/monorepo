function corsOrigin () {
  const whitelist = [
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
