import {MapToCombinedEvent} from 'types/combined-events'

export const mapCombinedEvents:MapToCombinedEvent=function (childEvent, parentEventId) {
    return {
      parentEventId,
      childEventId: childEvent.id
    }

}

