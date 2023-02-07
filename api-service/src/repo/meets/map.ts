import {MapToMeet, Meet} from 'types/meets'
export const mapMeets:MapToMeet=function(list) {
  const genderMap = {
    1: 'Karlar',
    2: 'Konur'
  }

  let currentId
  const result:Meet[] = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const meetObj:any = {
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
        hasAttachment: item.hasattachment,
        competition: []
      }

      result.push(meetObj)
      currentId = item.id
    }

    const currentMeet = result[result.length - 1]
    if (item.competitionid) {
      // Create membership
      const competitionObj = {
        id: item.competitionid,
        eventId: item.eventid,
        eventName: item.eventname,
        meetId: item.id,
        ageFrom: item.agefrom,
        ageTo: item.ageto,
        gender: item.gender
          ? {
              value: item.gender,
              text: genderMap[item.gender]
            }
          : undefined
      }

      currentMeet.competition.push(competitionObj)
    }
  })

  return result
}
