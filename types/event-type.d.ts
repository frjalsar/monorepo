export type eventType={
    id: number,
    name: string,
    ordering: number
}


export type mapToEventType=(row)=>eventType


export type selectEventTypes=()=>Promise<number>
export type insertEventType=(eventType:eventType,user:any)=>Promise<number>
export type updateEventType=(eventType:eventType,user:any)=>Promise<number>