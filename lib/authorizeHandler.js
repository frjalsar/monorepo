function authorize (allowed) {
  return (req, res, next) => {
    const hasAdmin = allowed.includes('admin')
    if (hasAdmin && req.user.admin) {
      return next()
    }

    const hasClub = allowed.includes('club')
    if (hasClub && req.user.clubid === req.body.id) {
      return next()
    }

    return res.sendStatus(403)
  }
}

module.exports = authorize
