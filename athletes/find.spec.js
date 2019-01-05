const expect = require('chai').expect
const find = require('./find')

describe('find', () => {
  it('should give results for Bergur', () => {
    return find('Berg')
      .then(list => {
        expect(list).to.have.lengthOf(2)
      })
  })
})
