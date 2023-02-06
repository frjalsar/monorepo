import { CreateUser } from 'types/user'

export type MakeCreateUser=(insertUser:any, selectUsers:any, setUser:any)=>CreateUser

export const makeCreateUser:MakeCreateUser=function (insertUser, selectUsers, setUser) {
  return function creatUser (obj, user) {
    return insertUser(obj, user)
      .then(id => selectUsers({ id }))
      .then(users => {
        const user = users[0]

        // Cleanup before storing in redis and returning user
        const token = user.token
        user.password = undefined
        user.token = undefined
        setUser(token, user)
        return user
      })
  }
}

