import { Competition } from 'types/competition'
import { MapToMeet, Meet } from 'types/meet'
import { mapToCompetition } from '../competitions/map'
import { mapToVenue } from '../venues/map'
import { mapToJudge } from '../judges/map'

export const mapToMeet: MapToMeet = function (row) {
  return {
    id: row.meet_id,
    name: row.meeet_name,
    organizerName: row.meet_organizername,
    organizerKt: row.meet_organizerkt,
    contactName: row.meet_contactname,
    contactEmail: row.meet_contactemail,
    contactPhone: row.meet_contactphone,
    location: row.meet_location,
    startdate: row.meet_startdate,
    enddate: row.meet_enddate,
    status: row.meet_status,
    sent: row.meet_sent,
    hasAttachment: row.meet_hasattachment,
    venueId: row.venue_id,
    judgeId: row.judge_id,
    competitions: [],
    venue: row.venue_id ? mapToVenue(row) : undefined,
    judge: row.judge_id ? mapToJudge(row) : undefined

  }
}

export const mapMeets = function (list) {
  let currentId
  const result: Meet[] = []
  list.forEach(item => {
    if (item.meet_id !== currentId) {
      const meetObj: Meet = mapToMeet(item)

      result.push(meetObj)
      currentId = item.meet_id
    }

    const currentMeet = result[result.length - 1]
    if (item.competition_id) {
      const competitionObj: Competition = mapToCompetition(item)
      currentMeet.competitions.push(competitionObj)
    }
  })

  return result
}
