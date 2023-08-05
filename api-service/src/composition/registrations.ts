
import { makeSelectRegistrations } from '../repo/registrations/select'
import { makeInsertRegistrations } from '../repo/registrations/insert'
import { makeUpdateRegistrations } from '../repo/registrations/update'
import { makeDeleteRegistrations } from '../repo/registrations/delete'
import { makeRegistrationsRoute } from '../routes/registrations'
import { PoolClient } from 'pg'
import { IRouter } from 'express'
import { DeleteRegistrations, InsertRegistrations, SelectRegistrations, UpdateRegistrations } from 'types/registration'

export type MakeRegistrations = (db: PoolClient) => IRouter

export function makeRegistrations (db: PoolClient) {
  const selectRegistrations: SelectRegistrations = makeSelectRegistrations(db)
  const insertRegistrations: InsertRegistrations = makeInsertRegistrations(db)
  const updateRegistrations: UpdateRegistrations = makeUpdateRegistrations(db)
  const deleteRegistrations: DeleteRegistrations = makeDeleteRegistrations(db)

  return makeRegistrationsRoute(selectRegistrations, insertRegistrations, updateRegistrations, deleteRegistrations)
}
