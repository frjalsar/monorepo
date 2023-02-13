import { MapToJudgeType } from 'types/judgetype'

export const mapJudgeTypes: MapToJudgeType = function (row) {
  return {
    id: row.id,
    name: row.name,
    stage: row.stage
  }
}
