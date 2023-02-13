import { makeSelectUsers } from '../repo/users/select'
import { makeSetUser } from '../userstore/set'
import { makeLoginHandler } from '../lib/loginHandler'
import { makeLoginRouter } from '../routes/login'
import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { SelectUsers } from 'types/user'

export type MakeLogin = (db: PoolClient) => IRouter

export const makeLogin = function (db, redis, isProduction) {
  const selectUsers: SelectUsers = makeSelectUsers(db)
  const setUser = makeSetUser(redis)
  const loginHandler = makeLoginHandler(selectUsers, setUser)

  return makeLoginRouter(loginHandler, isProduction)
}
