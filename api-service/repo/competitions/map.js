function mapCompetitions (list) {
  const result = []
  list.forEach(item => {
    const competitionObj = {
      id: item.id,
      meetId: item.meetid,
      eventId: item.eventid,
      ageFrom: item.agefrom,
      ageTo: item.ageto,
      gender: item.gender,
      indoor: item.indoor

    }

    result.push(competitionObj)
  })
  return result
}

module.exports = mapCompetitions
