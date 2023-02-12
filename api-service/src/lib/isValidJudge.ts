
import * as df from 'date-fns'
export const isValidJudge = function (date) {
  const VALID_YEARS = 5
  const today = df.startOfToday()

  const yearDiff = df.differenceInCalendarYears(today, date)
  return yearDiff < VALID_YEARS
}

/** * same day 5 years later logic

  const addYears = require('date-fns/addYears')

const isValidJudge = function (date) {

  const today =  startOfToday()
  const lastDay = addYears(date, VALID_YEARS)

  return today <= lastDay
}
***/
