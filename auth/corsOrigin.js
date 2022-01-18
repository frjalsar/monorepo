function corsOrigin () {
  const whitelist = {
    production: [
      'https://felagatal.fri.is',
      'https://felagaskipti.fri.is',
      'https://admin.fri.is',
      'https://fri-mot-production.herokuapp.com'
    ],
    development: [
      'http://local.fri.is:1234',
      'http://localhost:1234',
      'http://localhost:3001',
      'http://local.fri.is:3001',
      'http://local.fri.is:3010'
    ]
  }

  return function (origin, cb) {
    if (whitelist[process.env.NODE_ENV].indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed'))
    }
  }
}

module.exports = corsOrigin
