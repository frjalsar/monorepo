export type event = {
  id: number,
  name: string,
  iaaf: string,
  typeId: number
  childeventid:number,
  type: any,
  thorId?:number,
  childEvents?:any[]

}

export type MapToEvent = (row: any) => event

export type selectEventOptions = {
  id: number | string
  typeId: number | string
}

export type selectEvents = (options?: selectEventOptions) => Promise<event[]>
export type insertEvent  = (event: event, user: any) => Promise<number>
export type updateEvent  = (event: event, user: any) => Promise<number>
export type createEvent  = (event:event,user:any)=>Promise<any>
export type editEvent    = (event:event,user:any)=>Promise<any>