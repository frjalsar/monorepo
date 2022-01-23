function mapCombinedEvents (childEvents, parentEventId) {
  return childEvents.map(childEvent => {
    return {
      parentEventId: parentEventId,
      childEventId: childEvent.id
    }
  })
}

module.exports = mapCombinedEvents
