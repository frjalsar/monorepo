const format = require('date-fns/format')

function mapJudges (list) {
  const result = []
  list.forEach(item => {
    const judgeObj = {
      id: item.id,
      fullName: item.fullname,
      date: item.date ? format(item.date, 'yyyy-MM-dd') : null,
      clubId: item.clubid,
      club: {},
      typeId: item.typeid,
      type: {}
    }

    if (item.clubid !== null) {
      judgeObj.club = {
        id: item.clubid,
        fullName: item.clubfullname,
        thorId: item.thorclubid
      }
    }

    if (item.typeid !== null) {
      judgeObj.type = {
        id: item.typeid,
        name: item.typename,
        stage: item.typestage,
      }
    }

    result.push(judgeObj)
  })

  return result
}

module.exports = mapJudges
