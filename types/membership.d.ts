import { Club } from './club'
import { User } from './user'

export type Membership = {
  athleteId: number
  clubId: number
  clubFullName: string
  legacyClub: string | null
  yearFrom: number | null
  yearTo: number | null
  confirmed: boolean
  athletesigned?: boolean
  clubsigned?: boolean
}

export type AssignMembership = (membership: Membership, athleteId: number) => Membership
export type MapToMembership = (row: any) => Membership

export type SelectMembershipOptions = {
  athleteId: number | string;
  clubId: number | string;
  confirmed: number | string;
};

export type SelectMemberships = (options?: SelectMembershipOptions) => Promise<Membership[]>;
export type InsertMembership = (membership: Membership[], user: User) => Promise<number>;
export type DeleteMembership = (athleteId: number) => Promise<number>;
export type DisabledMembership = (athleteId: number) => Promise<number>;
export type SelectLegacyClubs = () => Promise<Club[]>;
