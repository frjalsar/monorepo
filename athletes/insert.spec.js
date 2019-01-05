const expect = require('chai').expect
const insert = require('./insert')

describe('select', () => {
  it('should insert athlete', () => {
    return insert({
      fullName: 'Kristinn Torfason',
      ssnr: 'xxxxxxxxxx'
    })
      .then(id => {
        expect(id).to.be.above(1)
      })
  })
})
