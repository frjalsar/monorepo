import { User } from './user'

export type Meet = {
    name: string,
    organizerName: string,
    organizerKt: string,
    contactName: string,
    contactEmail: string,
    contactPhone: string,
    location: string,
    venueId: number,
    judgeId: number,
    startDate?: Date,
    endDate?: Date,
    attachment: any,
    status:number,
    id?: number,
    base64Attachment?: any,
    competition: any
}

export type MapToMeet = (list: any[]) => Meet[]

export type SelectMeetOptions = {
    id?: number | string,
    status?: number | string
}

export type SelectMeets = (opt?: SelectMeetOptions) => Promise<Meet[]>
export type SelectMeetAttachment = (meetId: number | string) => Promise<any>
export type UpdateMeet = (meet: Meet, user: User) => Promise<number>
export type InsertMeet = (meets: Meet, user: User) => Promise<number>
export type MakeCreateMeets = (meets: Meet, user: User) => Promise<any>
