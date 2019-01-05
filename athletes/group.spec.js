const expect = require('chai').expect
const groupAthletes = require('./group')

describe('group', () => {
  it('should group clubs under athlete', () => {
    const dummyList = [{
      id: 1,
      fullname: 'Bergur Hallgrímsson',
      ssnr: '1907834139',
      clubname: 'Ungmennasamband Borgarfjarðar',
      clubid: 1,
      from: '1994-01-01T00:00:00.000Z',
      to: '1998-12-31T00:00:00.000Z',
      activeclub: false
    }, {
      id: 1,
      fullname: 'Bergur Hallgrímsson',
      ssnr: '1907834139',
      clubname: 'Breiðablik',
      clubid: 2,
      from: '1999-01-01T00:00:00.000Z',
      to: null,
      activeclub: true
    }]

    const groupedList = groupAthletes(dummyList)

    expect(groupedList).to.have.lengthOf(1)
    expect(groupedList[0].clubs).to.have.lengthOf(2)
  })
})
