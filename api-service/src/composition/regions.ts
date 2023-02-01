import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { makeSelectRegions } from '../repo/regions/select'
import { makeUpdateRegion } from '../repo/regions/update'
import { makeInsertRegion } from '../repo/regions/insert'
import { makeRegionsRouter } from '../routes/regions'
import { InsertRegion, SelectRegions, UpdateRegion } from 'types/region'

export type MakeRegions = (db: PoolClient) => IRouter

export function makeRegions (db: PoolClient) {  
  const selectRegions: SelectRegions = makeSelectRegions(db)
  const updateRegion: UpdateRegion = makeUpdateRegion(db)
  const insertRegion: InsertRegion = makeInsertRegion(db)

  return makeRegionsRouter(selectRegions, updateRegion, insertRegion)
}
