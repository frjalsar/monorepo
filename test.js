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
