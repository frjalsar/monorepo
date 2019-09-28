function mapMembership (clubs, athleteId) {
  return clubs.map(club => {
    return {
      athleteId: athleteId,
      clubId: club.id,
      from: club.from ? club.from : null,
      to: club.to ? club.to : null,
      legacyClub: club.legacyClub
    }
  })
}

module.exports = mapMembership