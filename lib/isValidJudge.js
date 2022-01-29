const startOfToday = require('date-fns/startOfToday')
const addYears = require('date-fns/addYears')

const isValidJudge = function (date) {
  const VALID_YEARS = 5
  const today =  startOfToday()
  const lastDay = addYears(date, VALID_YEARS)

  return today <= lastDay
}

module.exports = isValidJudge