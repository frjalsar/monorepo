import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectVenues } from '../repo/venues/select'
import { makeUpdateVenue } from '../repo/venues/update'
import { makeInsertVenue } from '../repo/venues/insert'
import { makeVenuesRouter } from '../routes/venues'
import {SelectVenues,UpdateVenue,InsertVenue} from 'types/venue'

export type MakeVenues = (db: PoolClient) => IRouter

export function makeVenues(db: PoolClient) {

  const selectVenues:SelectVenues = makeSelectVenues(db)
  const updateVenue:UpdateVenue = makeUpdateVenue(db)
  const insertVenue:InsertVenue = makeInsertVenue(db)

  return makeVenuesRouter(insertVenue,updateVenue,selectVenues)
}

