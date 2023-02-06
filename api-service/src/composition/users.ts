import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeSelectUsers} from '../repo/users/select'
import {makeUpdatetUser} from '../repo/users/update'
import {makeInsertUser} from '../repo/users/insert'
import {makeCreateUser} from '../repo/users/create'
import {makeSetUser} from '../userstore/set'
import {makeUsersRouter} from '../routes/users'


export type MakeClubs = (db: PoolClient) => IRouter

export const makeUsers=function (db, redis) {

  const selectUsers = makeSelectUsers(db)
  const updateUser = makeUpdatetUser(db)
  const insertUser = makeInsertUser(db)
  const setUser = makeSetUser(redis)

  const createUser = makeCreateUser(insertUser, selectUsers, setUser)

  return makeUsersRouter(selectUsers, updateUser, createUser)
}


