import { format } from 'date-fns'
import { MapToJudge } from 'types/judge'
import { isValidJudge } from '../../lib/isValidJudge'
import { mapToClubPartial } from '../clubs/map'
import { mapToJudgeType } from '../judgetypes/map'
import { mapToRegion } from '../regions/map'

export const mapToJudge: MapToJudge = function (row) {
  return {
    id: row.judge_id,
    fullName: row.judge_fullname,
    date: row.judge_date ? format(row.judge_date, 'yyyy-MM-dd') : null,
    typeId: row.judgetype_id,
    type: row.judgetype_id ? mapToJudgeType(row) : undefined,
    clubId: row.club_id,
    club: row.club_id ? mapToClubPartial(row) : undefined,
    regionId: row.region_id,
    region: row.region_id ? mapToRegion(row) : undefined,
    valid: isValidJudge(row.judge_date)
  }
}
