import { MapToJudgeType } from 'types/judgetype'

export const mapToJudgeType: MapToJudgeType = function (row) {
  return {
    id: row.judgetype_id,
    name: row.judgetype_name,
    stage: row.judgetype_stage
  }
}
