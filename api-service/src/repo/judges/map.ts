import { format } from 'date-fns'
import { MapToJudge } from 'types/judge'
import { isValidJudge } from '../../lib/isValidJudge'
import { mapToClubPartial } from '../clubs/map'
import { mapToJudgeType } from '../judgetypes/map'
import { mapToRegion } from '../regions/map'

export const mapToJudges: MapToJudge = function (row) {
  return {
    id: row.judge_id,
    fullName: row.judge_fullname,
    date: row.date ? format(row.judge_date, 'yyyy-MM-dd') : null,
    typeId: row.judgetype_id,
    type: mapToJudgeType(row),
    clubId: row.club_id,
    club: mapToClubPartial(row),
    regionId: row.region_id,
    region: mapToRegion(row),
    valid: isValidJudge(row.date)
  }
}
