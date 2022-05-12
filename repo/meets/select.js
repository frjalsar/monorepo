const mapMeets = require('./map')

function makeSelectMeets (db) {
  return function selectMeets (options) {
    const opt = options || {}

    const params = []
    let sql = `
      SELECT
        m.id,
        m.name,
        m.organizername,
        m.organizerkt,
        m.contactname,
        m.contactemail,
        m.contactphone,
        m.location,
        m.venueid,
        v.fullname venuename,
        m.judgeid,
        j.fullname judgename,
        m.startdate,
        m.enddate,
        m.status,
        m.sent,
        (m.attachment IS NOT NULL) hasattachment,
        c.id competitionid,
        c.agefrom,
        c.ageto,
        c.gender,
        e.id eventid,
        e.name eventname
      FROM
        meets m
      LEFT JOIN
        competitions c ON c.meetid = m.id
      LEFT JOIN
        events e ON e.id = c.eventid
      LEFT JOIN
        venues v ON v.id = m.venueid
      LEFT Join
        judges j ON j.id = m.judgeid
      WHERE 1=1`

    if (opt.id) {
      sql += ' AND m.id = $1'
      params.push(opt.id)
    } else if (opt.status) {
      sql += ' AND m.status = $1'
      params.push(opt.status)
    }

    sql += ' ORDER BY m.name ASC'

    return db
      .query(sql, params)
      .then(res => mapMeets(res.rows))
  }
}

module.exports = makeSelectMeets
