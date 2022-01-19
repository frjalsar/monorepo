const { Router } = require('express')


function makeLoginRoute (loginHandler, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    return loginHandler(username, password)
      .then(({ token, user }) => {
        if (token && user) {
          res
            .cookie(
              'FRI_API_TOKEN',
              token,
              {
                domain: '.fri.is',
                secure: isProduction,
                maxAge: 2147483647000,
                httpOnly: true,
                sameSite: true,
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

