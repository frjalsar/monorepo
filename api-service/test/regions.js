require('dotenv').config()

const supertest = require('supertest')
const expect = require('chai').expect
const app = require('./app')

describe('regions', () => {
  it('should return list of regions', () => {
    return supertest(app)
      .get('/regions')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.length.above(10)
      })
  })
})
