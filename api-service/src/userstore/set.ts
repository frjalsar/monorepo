
export function makeSetUser (redisClient) {
  return (user) => {
    return new Promise((resolve, reject) => {
      // cleanup before putting in redis
      const token = user.token
      user.password = undefined
      user.token = undefined

      redisClient.set(token, JSON.stringify(user), (err, reply) => {
        if (err) {
          return reject(new Error(err))
        }
        return resolve({ token, user })
      }
      )
    })
  }
}
