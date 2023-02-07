export type Agegroup= {
from:number | null
to:number  | null
}


export type SelectAgeGroups=()=>Promise<Agegroup[]>