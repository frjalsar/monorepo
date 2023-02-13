import { User } from './user'

export type JudgeType = {
    id: number
    name: string,
    stage: number
}

export type MapToJudgeType = (row: any) => JudgeType

export type SelectJudgeTypes = () => Promise<JudgeType[]>
export type InsertJudgeType = (judgeType: JudgeType, user: User) => Promise<number>
export type UpdateJudgeType = (judgeType: JudgeType, user: User) => Promise<number>
