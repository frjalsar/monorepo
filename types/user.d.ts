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