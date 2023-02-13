import { MapToCombinedEvent } from 'types/combinedevent'

export const mapToCombinedEvents: MapToCombinedEvent = function (childEvent, parentEventId) {
  return {
    parentEventId,
    childEventId: childEvent.id
  }
}
