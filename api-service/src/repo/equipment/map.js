function mapEquipment (list) {
  const result = []
  list.forEach(item => {
    const equipmentObj = {
      id: item.id,
      eventId: item.eventid,
      gender: item.gender,
      age: Number(item.age),
      value: Number(item.value),
      unit: item.unit,
      event: {}
    }

    if (item.eventid !== null) {
      equipmentObj.event = {
        id: item.eventid,
        name: item.eventname
      }
    }
    result.push(equipmentObj)
  })
  return result
}

module.exports = mapEquipment
