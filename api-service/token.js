const uid = require('uid-safe')
const token = uid.sync(24)

console.log(token)
