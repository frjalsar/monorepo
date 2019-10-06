function mapMembership (membership, athleteId, status) {
  return membership.map(m => {
    return {
      athleteId: athleteId,
      clubId: m.clubId,
      from: m.from ? m.from : null,
      to: m.to ? m.to : null,
      legacyClub: m.legacyClub,
      status: status
    }
  })
}

module.exports = mapMembership
