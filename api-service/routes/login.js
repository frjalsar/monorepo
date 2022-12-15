const { Router } = require('express')

function makeLoginRoute (loginHandler, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    
    console.log('refer', req.get('referrer'))
    console.log('host', req.get('host'))
    console.log('origin', req.get('origin'))
    console.log('authority', req.get('authority'))
    const host = req.get('origin')
    const dot = host.indexOf('.')
    const domain = dot > -1 ? host.substring(dot + 1) : undefined

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

module.exports = makeLoginRoute

