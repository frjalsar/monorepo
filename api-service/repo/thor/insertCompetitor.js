function makeInsertCompetitor () {
  return () => {
    return Promise.resolve(true)
  }
}

module.exports = makeInsertCompetitor
