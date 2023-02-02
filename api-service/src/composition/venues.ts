import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectVenues } from '../repo/venues/select'
import { makeUpdateVenue } from '../repo/venues/update'
import { makeInsertVenue } from '../repo/venues/insert'
import { makeVenuesRouter } from '../routes/venues'
import {selectVenues,updateVenue,insertVenue} from 'types/venue'

export type MakeVenues = (db: PoolClient) => IRouter

export function makeVenues(db: PoolClient) {

  const selectVenues:selectVenues = makeSelectVenues(db)
  const updateVenue:updateVenue = makeUpdateVenue(db)
  const insertVenue:insertVenue = makeInsertVenue(db)

  return makeVenuesRouter(insertVenue,updateVenue,selectVenues)
}

