const pool = require('../../config/database')

module.exports = {
  getSchedule: (callback) => {
    pool.query(
      'SELECT schedule.*, route.origen, route.destination, company.company_name FROM schedule, route, operator, bussed, company, driver WHERE route.id = schedule.route_id AND operator.id = route.bus_id AND bussed.id = operator.bus_id AND company.id = bussed.company_id AND driver.id = operator.driver_id',
      [],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getScheduleByScheduleId: (id, callback) => {
    pool.query(
      'SELECT schedule.*, route.origen, route.stops, route.destination, company.company_name FROM schedule, route, operator, bussed, company, driver WHERE schedule.id = ? AND route.id = schedule.route_id AND operator.id = route.bus_id AND bussed.id = operator.bus_id AND company.id = bussed.company_id AND driver.id = operator.driver_id',
      [id],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        const res = {
          id: results[0].id,
          check_in: results[0].check_in,
          check_out: results[0].check_out,
          date: results[0].date,
          platform: results[0].platform,
          cost: results[0].cost,
          origen: results[0].origen,
          route_id: results[0].route_id,
          stops: JSON.parse(results[0].stops),
          destination: results[0].destination,
          company_name: results[0].company_name,
        }

        return callback(null, res)
      }
    )
  },
  getScheduleByIdEdit: (id, callback) => {
    pool.query(
      'SELECT * FROM schedule WHERE schedule.id = ?',
      [id],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  getScheduleByDataRange: (data, callback) => {
    pool.query(
      'SELECT schedule.*, route.origen, route.stops, route.destination, company.company_name FROM schedule, route, operator, bussed, company, driver WHERE route.id = schedule.route_id AND operator.id = route.bus_id AND bussed.id = operator.bus_id AND company.id = bussed.company_id AND driver.id = operator.driver_id AND schedule.date BETWEEN ? AND ?',
      [
        data.date_init,
        data.date_end
      ],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO schedule (check_in, check_out, date, route_id, platform, cost) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.check_in,
        data.check_out,
        data.date,
        data.route_id,
        data.platform,
        data.cost,
      ],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  update: (data, callback) => {
    pool.query(
      'UPDATE schedule SET check_in = ?, check_out = ?, date = ?, route_id = ?, platform = ?, cost = ? WHERE id = ?',
      [
        data.check_in,
        data.check_out,
        data.date,
        data.route_id,
        data.platform,
        data.cost,
        data.id,
      ],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  deleted: (data, callback) => {
    pool.query(
      'DELETE FROM schedule WHERE id = ?',
      [data.id],
      (err, results, fields) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
}
