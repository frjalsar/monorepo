import { MapToEvent, Event } from 'types/events'
import { mapToEventType } from '../eventtypes/map'

export const mapToEvent: MapToEvent = function (row) {
  return {
    id: row.event_id,
    name: row.event_name,
    official: row.event_official,
    worldrecord: row.event_worldrecord,
    typeId: row.eventtype_id,
    type: mapToEventType(row),
    childEvents: row.childevent_id ? [] : undefined
  }
}

export const mapEvents = function (list) {
  let currentId
  const result: Event[] = []

  list.forEach(item => {
    if (item.event_id !== currentId) {
      const eventObj: Event = mapToEvent(item)
      result.push(eventObj)
      currentId = item.event_id
    }

    const currentEvent = result[result.length - 1]

    if (currentEvent.childEvents) {
      const childEvent: Partial<Event> = {
        id: item.childevent_id,
        name: item.childevent_name
      }

      currentEvent.childEvents.push(childEvent)
    }

    if (item.eventtype_id !== null) {
      currentEvent.type = mapToEventType(item)
    }
  })

  return result
}
