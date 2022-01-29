function mapMeets (list) {
  let currentId
  const result = []  
  list.forEach(item => {
    if (item.id !== currentId) {
      const meetObj = {
        id: item.id,
        name: item.name,
        organizerName: item.organizername,
        organizerKt: item.organizerkt,
        contactName: item.contactname,
        contactEmail: item.contactemail,
        contactPhone: item.contactphone,      
        location: item.location,
        venueId: item.venueid,
        venueName: item.venuename,
        judgeId: item.judgeid,
        judgeName: item.judgename,
        startDate: item.startdate,
        endDate: item.endate,
        status: item.status,
        sent: item.sent,
        competition: []
      }

      result.push(meetObj)
      currentId = item.id
    }

    const currentMeet = result[result.length - 1]
    if (item.competitionid ) {
      // Create membership
      const competitionObj = {
        id: item.competitionid,
        eventId: item.eventid,        
        eventName: item.eventname,
        meetId: item.id
      }

      currentMeet.competition.push(competitionObj)
    }    
  })

  return result
}

module.exports = mapMeets