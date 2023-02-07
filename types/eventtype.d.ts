export type EventType={
    id: number,
    name: string,
    ordering: number
}


export type MapToEventType=(row)=>EventType


export type SelectEventOptions={
    typeId:number|string
}
export type SelectEventTypes=(option?:SelectEventOptions)=>Promise<Event>
export type InsertEventType=(eventType:EventType,user:any)=>Promise<number>
export type UpdateEventType=(eventType:EventType,user:any)=>Promise<number>