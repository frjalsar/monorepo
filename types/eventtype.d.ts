export type EventType={
    id: number,
    name: string,
    ordering: number
}


export type MapToEventType=(row)=>EventType


export type SelectEventTypes=()=>Promise<number>
export type InsertEventType=(eventType:EventType,user:any)=>Promise<number>
export type UpdateEventType=(eventType:EventType,user:any)=>Promise<number>