function athleteMembership (clubs, athleteId) {
  return clubs.map(club => {
    return {
      athleteId: athleteId,
      clubId: club.id,
      from: club.fromdate,
      to: club.todate
    }
  })
}

module.exports = athleteMembership
