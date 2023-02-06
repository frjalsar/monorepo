import { makeSelectMeets } from '../repo/meets/select'
import { makeSelectMeetAttachment } from '../repo/meets/selectattachment'
import { makeUpdateMeet } from '../repo/meets/update'
import { makeInsertMeet } from '../repo/meets/insert'
import { makeCreateMeet } from '../repo/meets/create'
import { makeInsertCompetition } from '../repo/competitions/insert'
import { makeMeetsRouter } from '../routes/meets'
import { poolClient } from 'pg'
import { SelectMeets, SelectMeetAttachment, UpdateMeet, MakeSendMail } from 'types/meets'
// import { MakeInsertMeet } from '../repo/meets/insert'
// import { MakeInsertCompetition } from '../repo/competitions/insert'
import { IRouter } from 'express'

export type MakeMeets = (db: poolClient, sendMail) => IRouter

// export type CreateMeet = (
//   makeInsertMeet: MakeInsertMeet,
//   makeInsertCompetition: MakeInsertCompetition,
//   db: poolClient,
//   sendMail: MakeSendMail
// ) => IRouter
  
export const makeMeets: MakeMeets = function (db, sendMail) {

  const selectMeets: SelectMeets = makeSelectMeets(db)
  const selectMeetAttachment: SelectMeetAttachment = makeSelectMeetAttachment(db)
  const updateMeet: UpdateMeet = makeUpdateMeet(db)
  const createMeet = makeCreateMeet(makeInsertMeet, makeInsertCompetition, db, sendMail)

  return makeMeetsRouter(selectMeets, selectMeetAttachment, updateMeet, createMeet)
}

