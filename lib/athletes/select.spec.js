const expect = require('chai').expect
const selectById = require('./select')

describe('select', () => {
  it('should give results for id', () => {
    return selectById({ id: 1 })
      .then(list => {
        expect(list).to.have.lengthOf(2)
        expect(list[0]).to.have.property('id', 1)
        expect(list[1]).to.have.property('id', 1)
      })
  })
})
