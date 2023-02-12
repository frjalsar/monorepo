import * as df from 'date-fns'
import { isValidJudge } from '../../lib/isValidJudge'
import { MapToJudge } from 'types/judges'

export const mapToJudges: MapToJudge = function (row) {
  return {
    id: row.id,
    fullName: row.fullname,
    date: row.date ? df.format(row.date, 'yyyy-MM-dd') : null,
    typeId: row.typeid,
    type: row.typeid
      ? {
          id: row.typeid,
          name: row.typename,
          stage: row.typestage
        }
      : {},
    clubId: row.clubid,
    club: row.clubId
      ? {
          id: row.clubid,
          fullName: row.clubfullname,
          thorId: row.thorclubid
        }
      : {},
    valid: isValidJudge(row.date)
  }
}
