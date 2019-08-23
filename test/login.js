require('dotenv').config()

const supertest = require('supertest')
const expect = require('chai').expect
const app = require('./app')

describe('login', () => {
  it('should return user on correct login', () => {
    return supertest(app)
      .post('/login')
      .send({
        username: '1907834139',
        password: 'Aq1Sw2De'
      })
      .expect(200)
      .then(res => {
        expect(res.body.token).to.have.lengthOf(24)
        expect(res.body.username).to.equal('1907834139')
      })
  })

  it('should return 401 on bad login', () => {
    return supertest(app)
      .post('/login')
      .send({
        username: 'A',
        password: 'B'
      })
      .expect(401)
      .then(res => {
        expect(res.text).to.equal('Notendanafn eða lykilorð rangt')
      })
  })
})
