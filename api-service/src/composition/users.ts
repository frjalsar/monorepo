import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeSelectUsers} from '../repo/users/select'
import {makeUpdatetUser} from '../repo/users/update'
import {makeInsertUser} from '../repo/users/insert'
import {makeCreateUser} from '../repo/users/create'
import {makeSetUser} from '../userstore/set'
import {makeUsersRouter} from '../routes/users'
import { InsertUser, SelectUsers, UpdateUser } from 'types/user'


export type MakeClubs = (db: PoolClient) => IRouter

export const makeUsers=function (db, redis) {

  const selectUsers:SelectUsers = makeSelectUsers(db)
  const updateUser:UpdateUser = makeUpdatetUser(db)
  const insertUser:InsertUser = makeInsertUser(db)
  const setUser = makeSetUser(redis)

  const createUser = makeCreateUser(insertUser, selectUsers, setUser)

  return makeUsersRouter(selectUsers, updateUser, createUser)
}


