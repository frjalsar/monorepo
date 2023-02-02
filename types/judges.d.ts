
export type judge=  {
      id: number,
      fullName: string,
      date: any,
      typeId: number,
      clubId: number,
      type?: judgetypes,
      club?: judgeclub,
      valid?: boolean

    }

export type judgetypes=  {
        id?: string,
        name?: string,
        stage?: string,
     }

export type judgeclub = {
        id?: number,
        fullName?: string,
        thorId?: string
}

export type selectJudgeOptions = {
      id?: string | number | undefined,
      clubId?: number|string,
      typeId?: string | number,
      offset?: number | string,
      limit?: number | string
}

export type MapToJudge = (row:any) => judge

export type selectJudges = (options?: selectJudgeOptions) => Promise<judge[]>
export type insertJudge = (judge: judge, user: any) => Promise<number>
export type updateJudge = (judge: judge, user: any) => Promise<number>