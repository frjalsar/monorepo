import { Club } from './club'
import { User } from './user'

export type Membership = {
  athleteId: number;
  clubId: number;
  legacyClub: string;
  yearFrom: number;
  yearTo: number;
  confirmed: boolean;
  athletesigned?: boolean;
  clubsigned?: boolean;
};

export type MapToMembership = (row: any, athleteId: number) => Membership;

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
