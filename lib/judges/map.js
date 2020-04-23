const format = require('date-fns/format')

function mapJudges (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      date: item.date ? format(item.date, 'yyyy-MM-dd') : null,
      clubId: Number(item.clubid),
      clubFullName: item.clubfullname
    }
  })
}

module.exports = mapJudges
