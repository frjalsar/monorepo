
import  startOfToday  from 'date-fns/startOfToday'
import  differenceInCalendarYears from 'date-fns/differenceInCalendarYears'

export const isValidJudge = function (date) {
  const VALID_YEARS = 5
  const today = startOfToday()

  const yearDiff = differenceInCalendarYears(today, date)
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
