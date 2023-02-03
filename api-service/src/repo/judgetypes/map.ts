import { mapToJudgeType } from 'types/JudgeType'

export const mapJudgeTypes:mapToJudgeType= function(list) {
  return list.map(item => {
    return {
      id: item.id,
      name: item.name,
      stage: item.stage
    }
  })
}

