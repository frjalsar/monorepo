const { Router } = require('express')
const { authorize } = require('../lib/authorizeHandler')

function makeUsersRoute (selectUsers, updateUser, createUser) {
  const router = Router()

  router.get('/', authorize(['admin']), (req, res, next) => {
    selectUsers()
      .then(res.json.bind(res))
      .catch(next)
  })

  router.get('/:id', authorize(['admin']), (req, res, next) => {
    selectUsers({ id: req.params.id })
      .then(res.json.bind(res))
      .catch(next)
  })

  router.put('/', authorize(['admin']), (req, res, next) => {
    return updateUser(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  router.post('/', authorize(['admin']), (req, res, next) => {
    return createUser(req.body, req.user)
      .then(res.json.bind(res))
      .catch(next)
  })

  return router
}

module.exports = makeUsersRoute
