const format = require('date-fns/format')
const isValidJudge = require('../../lib/isValidJudge')

function mapJudges (list) {
  const result = []
  list.forEach(item => {
    const judgeObj = {
      id: item.id,
      fullName: item.fullname,
      date: item.date ? format(item.date, 'yyyy-MM-dd') : null,
      typeId: item.typeid,
      type: {},
      clubId: item.clubid,
      club: {},
      valid: isValidJudge(item.date)
    }

    if (item.typeid !== null) {
      judgeObj.type = {
        id: item.typeid,
        name: item.typename,
        stage: item.typestage,
      }
    }

    if (item.clubid !== null) {
      judgeObj.club = {
        id: item.clubid,
        fullName: item.clubfullname,
        thorId: item.thorclubid
      }
    }    

    result.push(judgeObj)
  })

  return result
}

module.exports = mapJudges
