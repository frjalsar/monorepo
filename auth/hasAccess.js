function hasAccess (entityId, reqId) {
  return (req, res, next) => {
    const id = reqId || 'id'
    let allowed = false
    if (req.user) {
      if (req.user.admin) {
        allowed = false
      }

      if (req.user[entityId] === req.body[id]) {
        allowed = true
      }
    }

    if (allowed) {
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = hasAccess
