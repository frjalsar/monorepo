export type Event = {
  id: number,
  name: string,
  iaaf: string,
  typeId: number
  childeventId:number,
  type: any,
  thorId?:number,
  childEvents?:any[]

}

export type MapToEvent = (row: any) => Event

export type SelectEventOptions = {
  id?: number | string
  typeId?: number | string
}

export type SelectEvents = (options?: SelectEventOptions) => Promise<Event[]>
export type InsertEvent  = (event: Event, user: any) => Promise<number>
export type UpdateEvent  = (event: Event, user: any) => Promise<number>
export type CreateEvent  = (event:Event,user:any)=>Promise<any>
export type EditEvent    = (event:Event,user:any)=>Promise<any>