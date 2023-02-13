import { JudgeType } from './judgetype'
import { User } from './user'

export type JudgeClub = {
  id?: number
  fullName?: string
  thorId?: string
}
export type Judge = {
  id: number
  fullName: string
  date: any
  typeId: number
  clubId: number
  type?: JudgeType
  club?: JudgeClub
  valid?: boolean
}

export type SelectJudgeOptions = {
  id?: string | number | undefined
  clubId?: number | string
  typeId?: string | number
  offset?: number | string
  limit?: number | string
}

export type MapToJudge = (row: any) => Judge

export type SelectJudges = (options?: SelectJudgeOptions) => Promise<Judge[]>
export type InsertJudge = (judge: Judge, user: User) => Promise<number>
export type UpdateJudge = (judge: Judge, user: User) => Promise<number>
