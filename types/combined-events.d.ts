export type combinedevent= {
    parentEventId: number,
	childEventId: number,
}


export type MapToCombinedEvent=(row:any, parentEventId:number)=>combinedevent



export type insertCombinedEvent=(combinedEvents:combinedevent[],user:any)=> Promise<number>
export type deleteCombinedEvent=(parentEventId:number,user:any)=> Promise<number>