function corsOrigin () {
  const whitelist = {
    production: [    
      'https://admin.fri.is',  
      'https://felagaskipti.fri.is',
      'https://umsokn.fri.is',            
    ],
    development: [
      'http://local.fri.is:3001',
      'http://local.fri.is:3002',
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
