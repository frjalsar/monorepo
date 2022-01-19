const { Router } = require('express')


function makeLoginRoute (loginHandler, isProduction) {
  const router = Router()

  router.post('/', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    return loginHandler(username, password)
      .then(user => {
        if (user && user.token) {
          res
            .cookie(
              'FRI_API_TOKEN',
              user.token,
              {
                domain: '.fri.is',
                secure: isProduction,
                maxAge: 2147483647000,
                httpOnly: true,
                sameSite: true,
                path: '/'
              }
            )
            .json({
              id: user.id,              
              username: user.username,
              isAdmin: user.isAdmin,
              isClub: user.clubId !== null,
              isRegion: user.regionId !== null,
              isMeet: user.meetId !== null
            })
        } else {
          res.sendStatus(401)
        }
      })
      .catch(next)
  })

  return router
}

module.exports = makeLoginRoute

