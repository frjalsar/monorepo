const format = require('date-fns/format')

function mapJudges (list) {
  const result = []
  list.forEach(item => {
    const judgeObj = {
      id: item.id,
      fullName: item.fullname,
      date: item.date ? format(item.date, 'yyyy-MM-dd') : null,
      clubId: item.clubid,
      club: {}
    }
    if (item.clubid !== null) {
      judgeObj.club = {
        id: item.clubId,
        fullName: item.clubfullname,
        thorId: item.thorclubid
      }
    }

    result.push(judgeObj)
  })

  return result
}

module.exports = mapJudges
