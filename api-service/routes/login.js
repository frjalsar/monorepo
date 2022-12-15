const { Router } = require('express')

function makeLoginRoute (loginHandler, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    console.log('host', req.get('host'))
    console.log('origin', req.get('origin'))
    console.log('referrer', req.get('referrer'))

    return loginHandler(username, password)
      .then(({ token, user }) => {
        if (token && user) {
          res
            .cookie(
              'FRI_API',
              token,
              {
                secure: isProduction,
                maxAge: 2147483647000,
                httpOnly: true,
                sameSite: 'none',
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

module.exports = makeLoginRoute
