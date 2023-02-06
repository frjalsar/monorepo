import {makeSelectThorAchievements} from '../repo/thor/achievements'
import {makeSelectThorEvents} from '../repo/thor/events'
import {makeSelectMissingRunners} from '../repo/thor/selectMissingRunners'
import {makeUpdateMissingRunner} from '../repo/thor/updateMissingRunner'
import { makeThorRoute } from '../routes/thor'
import { makeSelectCompetitor } from '../repo/thor/selectCompetitor'

import { mssqlPool } from 'mssql'
import { IRouter } from 'express'
import { SelectThorEvents, SelectThorAchievements, SelectMissingRunners, SelectCompetitor, UpdateMissingRunner } from 'types/thor'

export type MakeThor=(sqlConnection:mssqlPool)=>IRouter

export function makeThor(sqlConnection) {

  const selectThorEvents:SelectThorEvents = makeSelectThorEvents(sqlConnection)
  const selectThorAchievements:SelectThorAchievements = makeSelectThorAchievements(sqlConnection)
  const selectMissingRunners:SelectMissingRunners = makeSelectMissingRunners(sqlConnection)
  const selectCompetitor:SelectCompetitor = makeSelectCompetitor(sqlConnection)
  const updateMissingRunner:UpdateMissingRunner = makeUpdateMissingRunner(sqlConnection)

  return makeThorRoute(selectThorEvents, selectThorAchievements, selectMissingRunners, updateMissingRunner, selectCompetitor)
}

