function mapMembership (membership, athleteId) {
  return membership.map(m => {
    return {
      athleteId: athleteId,
      clubId: m.clubId,
      from: m.from ? m.from : null,
      to: m.to ? m.to : null,
      legacyClub: m.legacyClub,      
      sentBy: m.sentBy,
      sentAt: m.sentAt
    }
  })
}

module.exports = mapMembership
