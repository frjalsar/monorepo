export  const mapMeets =function(row) {
  const genderMap = {
    1: 'Karlar',
    2: 'Konur'
  }

  return {
        id: row.id,
        name: row.name,
        organizerName: row.organizername,
        organizerKt: row.organizerkt,
        contactName: row.contactname,
        contactEmail: row.contactemail,
        contactPhone: row.contactphone,
        location: row.location,
        venueId: row.venueid,
        venueName: row.venuename,
        judgeId: row.judgeid,
        judgeName: row.judgename,
        startDate: row.startdate,
        endDate: row.endate,
        status: row.status,
        sent: row.sent,
        hasAttachment: row.hasattachment,
    competition: row.competitionid ? [
           {
        id: row.competitionid,
        eventId: row.eventid,
        eventName: row.eventname,
        meetId: row.id,
        ageFrom: row.agefrom,
        ageTo: row.ageto,
        gender: row.gender
          ? {
              value: row.gender,
              text: genderMap[row.gender]
            }
          : undefined
      }
        ]:[]
  }
}

