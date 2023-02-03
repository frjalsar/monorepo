import { mapToJudgeType } from 'types/JudgeType'

export const mapJudgeTypes:mapToJudgeType= function(row) {
    return {
      id: row.id,
      name: row.name,
      stage: row.stage
    }
}

