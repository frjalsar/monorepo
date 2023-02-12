export type AgeGroup= {
from: number | null
to: number | null
}

export type SelectAgeGroups = () => Promise<AgeGroup[]>
