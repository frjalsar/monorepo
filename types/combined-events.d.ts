export type Combinedevent= {
    parentEventId: number,
	childEventId: number,
}


export type MapToCombinedEvent=(row:any, parentEventId:number)=>Combinedevent



export type InsertCombinedEvent=(combinedEvents:Combinedevent[],user:any)=> Promise<number>
export type DeleteCombinedEvent=(parentEventId:number,user:any)=> Promise<number>