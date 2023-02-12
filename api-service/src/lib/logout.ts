export function makeLogout (delUser, logger) {
  return function logout (token) {
    if (token) {
      delUser(token, (err) => {
        if (err) {
          logger.error('Error logging out')
          logger.error(err)
          return false
        }

        return true
      })
    }
    return true
  }
}
