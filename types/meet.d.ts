import { Competition } from './competition'
import { Venue } from './venue'
import { Judge } from './judge'
import { User } from './user'

export type Meet = {
    id: number
    name: string
    organizerName: string
    organizerKt: string
    contactName: string
    contactEmail: string
    contactPhone: string
    location: string
    venueId: number
    judgeId: number
    startDate?: Date
    endDate?: Date
    status: number
    hasAttachment: boolean
    base64Attachment?: string
    attachment?: Buffer
    competitions: Competition[]
    judge?: Partial<Judge>
    venue?: Partial<Venue>
}

export type MapToMeet = (row: any) => Meet

export type SelectMeetOptions = {
    id?: number | string,
    status?: number | string
}

export type SelectMeets = (opt?: SelectMeetOptions) => Promise<Meet[]>
export type SelectMeetAttachment = (meetId: number | string) => Promise<Buffer>
export type UpdateMeet = (meet: Meet, user: User) => Promise<number>
export type InsertMeet = (meet: Meet, user: User) => Promise<number>
export type MakeCreateMeets = (meet: Meet, user: User) => Promise<any>
export type CreateMeet = (meet: Meet, user: User) => Promise<number>
