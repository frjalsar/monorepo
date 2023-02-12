import { RequestHandler } from 'express'

export type UserRole = 'admin' | 'club' | 'application'
export type Authorize = (allowed: UserRole[]) => RequestHandler

export const authorize: Authorize = function (allowed) {
  return (req, res, next) => {
    const hasAdmin = allowed.includes('admin')
    if (hasAdmin && req.user.admin) {
      return next()
    }

    const hasApplication = allowed.includes('application')
    if (hasApplication && req.user.application) {
      return next()
    }

    const hasClub = allowed.includes('club')
    if (hasClub && req.user.clubId === req.body.id) {
      return next()
    }

    return res.sendStatus(403)
  }
}
