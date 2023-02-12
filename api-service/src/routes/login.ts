import { Router } from 'express'

export const makeLoginRouter = function (loginHandler, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    const host = req.get('host')!
    const dot = host.indexOf('.') || -1
    const domain = dot > -1 ? host.substring(dot + 1) : undefined

    /*
    const host = req.get('origin')
    const dot = host.indexOf('://')
    const domain = dot > -1 ? host.substring(dot + 3) : undefined
    */

    return loginHandler(username, password)
      .then(({ token, user }) => {
        if (token && user) {
          res
            .cookie(
              'FRI_API',
              token,
              {
                domain,
                secure: isProduction,
                maxAge: 2147483647000,
                httpOnly: true,
                sameSite: 'strict',
                path: '/'
              }
            )
            .json(user)
        } else {
          res.sendStatus(401)
        }
      })
      .catch(next)
  })

  return router
}
