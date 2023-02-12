export type User = {
  id: number
  username: string
  fullName: string
  clubId: number
  clubAbbreviation: string
  regionId: number
  regionAbbreviation: string
  meetId: number
  admin: boolean
  application: boolean
  password?: string
  token?: string
}

export type MapeToUser=(row:any)=>User

export type SelectUserOptions = {
  id?: number | string
  username?: number | string
  token?: number | string
}

export type SelectUsers=(option?:SelectUserOptions)=>Promise<User[]>
export type InsertUser=(data:User, user:any)=>Promise<number>
export type UpdateUser=(data:User, user:any)=>Promise<number>
export type CreateUser=(data:User, user:any)=>Promise<any>
