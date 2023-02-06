import { MapeToUser } from "types/user"

export const mapUsers:MapeToUser=function (row) {
  return {
    id: row.id,
    username: row.username,
    password: row.password,
    fullName: row.fullname,
    clubId: row.clubid,
    clubAbbreviation: row.clubabbreviation,
    regionId: row.regionid,
    regionAbbreviation: row.regionabbreviation,
    meetId: row.meetId,
    admin: row.admin,
    application: row.application,
    token: row.token
  }
}

