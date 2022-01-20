function mapMembership (membership, athleteId) {
  return membership.map(m => {
    return {
      athleteId: athleteId,
      clubId: m.clubId,
      legacyClub: m.legacyClub,
      yearFrom: m.yearFrom ? m.yearFrom : null,
      yearTo: m.yearTo ? m.yearTo : null,      
      confirmed: m.confirmed
    }
  })
}

module.exports = mapMembership
