require('dotenv').config()

const supertest = require('supertest')
const expect = require('chai').expect
const app = require('./app')

describe('athletes', () => {
  it('should return list of ahletes', () => {
    return supertest(app)
      .get('/athletes')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.length.above(10)
      })
  }).timeout(10000)

  it('should return single athlete', () => {
    return supertest(app)
      .get('/athletes/7993')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(1)
        expect(res.body[0].id).to.equal(7993)
        expect(res.body[0].fullName).to.equal('Bergur Hallgrímsson')
        expect(res.body[0].clubs).to.have.lengthOf(3)
      })
  })

  it.only('should update single athlete', () => {
    return supertest(app)
      .put('/athletes')
      .send({
        id: 7993,
        fullName: 'Bergur Hallgrímsson -',
        birthyear: 1983,
        gender: 1,
        country: 'ISL',
        thorId: 20844,
        clubs: [{
          id: 5,
          fullName: 'Ungmennafélagið Breiðablik',
          thorClub: null,
          from: '1999-1-1',
          to: null,
          current: true
        }, {
          id: 73,
          fullName: 'Ungmennafélag Stafholtstungna',
          thorClub: 'UMSB',
          from: '1994-1-1',
          to: '1998-12-31',
          current: false
        }, {
          id: 54,
          fullName: 'Ungmennafélagið Leiknir',
          thorClub: null,
          from: '1990-1-1',
          to: '1993-12-31',
          current: false
        }]
      })
      .expect(200)
      .then(res => {
        expect(res.body.athleteId).to.equal(7993)
      })
  })
})
