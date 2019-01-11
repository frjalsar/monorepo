function athleteMembership (clubs, athleteId) {
  return clubs.map(club => {
    return {
      athleteId: athleteId,
      clubId: club.id,
      from: club.from,
      to: club.to
    }
  })
}

module.exports = athleteMembership
