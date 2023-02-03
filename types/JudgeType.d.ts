
export type judgeType = {
    name:string,
    stage:number,
    id?:number
}

export type mapToJudgeType=(row:any)=>judgeType

export type selectJudgeTypes=()=>Promise<judgeType[]>
export type insertJudgeType=(judgeType:judgeType,user:any)=>Promise<number>
export type updateJudgeType=(judgeType:judgeType,user:any)=>Promise<number>