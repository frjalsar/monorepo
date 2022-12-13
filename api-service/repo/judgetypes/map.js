function mapJudgeTypes (list) {
  return list.map(item => {
    return {
      id: item.id,
      name: item.name,
      stage: item.stage
    }
  })
}

module.exports = mapJudgeTypes
