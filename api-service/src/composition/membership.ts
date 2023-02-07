import {makeSelectLegacyClubs} from '../repo/membership/legacyclubs'
import { PoolClient } from 'pg'
import { IRouter } from 'express'
import {makeMembershipRouter} from '../routes/membership'
import { SelectLegacyClubs } from 'types/membership'

export type MakeMembership = (db: PoolClient) => IRouter

export function makeMembership (db) {

  const selectLegacyClubs:SelectLegacyClubs = makeSelectLegacyClubs(db)

  return makeMembershipRouter(selectLegacyClubs)
}

