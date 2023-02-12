import { MapToCombinedEvent } from 'types/combinedevent'

export const mapCombinedEvents:MapToCombinedEvent = function (childEvent, parentEventId) {
  return {
    parentEventId,
    childEventId: childEvent.id
  }
}
