
export type Meet = {
    name:string,
    organizerName:string,
    organizerKt:string,
    contactName:string,
    contactEmail:string,
    contactPhone:string,
    location:string,
    venueId:number,
    judgeId:number,
    startDate?: Date,
    endDate?: Date,
    attachment: any,
    status:number,
    id?: number,
    base64Attachment?: any,
    competition:any
}


export type optionMeetSelect = {
    id: number|string,
    status:number|string
}

export type SelectMeetAttachmentParams = {
    meetId:number|string
}



export type SelectMeets=(opt?:optionMeetSelect)=>Promise<Meet[]>
export type SelectMeetAttachment=(meetId:SelectMeetAttachmentParams)=>Promise<any>
export type UpdateMeet=(meet:Meet, user:any)=>Promise<number>
export type InsertMeet = (meets: Meet, user: any) => Promise<number>

export type MakeCreateMeets=(meets:Meet, user:any)=>Promise<any>
export type MakeSendMail=(name:any,jncd:any)=>Promise<number>