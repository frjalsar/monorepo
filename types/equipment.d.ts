export type Equipment = {
      id: number,
      eventId: number,
      gender: number,
      age: number,
      value: number,
      unit: string,
      event?: EventType
}

export type EventType = {
    id?: number,
    name?: string
}

export type SelectEquipmentOption = {
    id: string | number
}

export type MapToEquipment = (item:any) => Equipment

export type SelectEquipment = (opt?:SelectEquipmentOption) => Promise<Equipment[]>
export type InsertEquipment = (equipment:Equipment, user:any) => Promise<number>
export type UpdateEquipment = (equipment:Equipment, user:any) => Promise<number>
