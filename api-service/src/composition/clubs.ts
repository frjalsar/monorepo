import {makeSelectClubs} from '../repo/clubs/select'
import {makeUpdateClub} from '../repo/clubs/update'
import {makeInsertClub} from '../repo/clubs/insert'
import {makeClubsRouter} from '../routes/clubs'


import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { InsertClub, SelectClubs, UpdateClub } from 'types/club'

export type MakeRegions = (db: PoolClient) => IRouter

export function makeClubs (db) {
  const selectClubs:SelectClubs = makeSelectClubs(db)
  const insertClub:InsertClub = makeInsertClub(db)
  const updateClub :UpdateClub= makeUpdateClub(db)

  return makeClubsRouter(selectClubs, updateClub, insertClub)
}

