require('dotenv').config()

const supertest = require('supertest')
const expect = require('chai').expect
const app = require('./app')

describe('clubs', () => {
  it('should return list of clubs', () => {
    return supertest(app)
      .get('/clubs')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.length.above(10)
      })
  })

  it('should return single club', () => {
    return supertest(app)
      .get('/clubs/5')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(1)
        expect(res.body[0].id).to.equal(5)
        expect(res.body[0].fullName).to.equal('Ungmennafélagið Breiðablik')
      })
  })
})
