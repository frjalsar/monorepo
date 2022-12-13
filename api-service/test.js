
/*
const isEqual = require('lodash.isequal')
const a = [
  {
    athleteId: 7993,
    clubId: 54,
    clubFullName: 'Ungmennafélagið Leiknir',
    legacyClub: null,
    from: 1990,
    to: 1993,
    confirmed: false
  },
  {
    athleteId: 7993,
    clubId: 73,
    clubFullName: 'Ungmennafélag Stafholtstungna',
    legacyClub: null,
    from: 1994,
    to: 1998,
    confirmed: false
  },
  {
    athleteId: 7993,
    clubId: 5,
    clubFullName: 'Ungmennafélagið Breiðablik',
    legacyClub: null,
    from: 1999,
    to: null,
    confirmed: false
  }
]
const b = [
  {
    athleteId: 7993,
    clubId: 54,
    clubFullName: 'Ungmennafélagið Leiknir',
    legacyClub: null,
    from: 1990,
    to: 1993,
    confirmed: true
  },
  {
    athleteId: 7993,
    clubId: 73,
    clubFullName: 'Ungmennafélag Stafholtstungna',
    legacyClub: null,
    from: 1994,
    to: 1998,
    confirmed: true
  },
  {
    athleteId: 7993,
    clubId: 5,
    clubFullName: 'Ungmennafélagið Breiðablik',
    legacyClub: null,
    from: 1999,
    to: null,
    confirmed: true
  }
]

const res = isEqual(a, b)
console.log(res)
*/

const y0 = new Date(2016, 5, 21)
const y1 = new Date(2017, 5, 21)
const y2 = new Date(2018, 5, 21)
const y3 = new Date(2019, 5, 21)
const y4 = new Date(2020, 5, 21)

const a = new Date(2021, 5, 20)
const b = new Date(2021, 5, 21)
const c = new Date(2021, 5, 22)
const d = new Date(2022, 0, 1)
const e = new Date(2022, 5, 21)

const years = require('date-fns/differenceInYears')
const calYears = require('date-fns/differenceInCalendarYears')
const days = require('date-fns/differenceInDays')
const calDays = require('date-fns/differenceInCalendarDays')
const isValidJudge = require('./lib/isValidJudge')

console.log('------')
console.log(isValidJudge(y0))
/*
console.log(isValidJudge(b, y0))
console.log(isValidJudge(c, y0))
console.log(isValidJudge(d, y0))
console.log(isValidJudge(e, y0))
*/

/*console.log('------')
console.log(calDays(a, y0))
console.log(calDays(b, y0))
console.log(calDays(c, y0))
console.log(calDays(d, y0))
*/
