const pool = require('../../config/database')

module.exports = {
  getRoute: (callback) => {
    pool.query(
      'SELECT * FROM route ORDER BY id ASC',
      [],
      (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  getRouteByRouteID: (id, callback) => {
    pool.query(
      'SELECT * FROM route WHERE route.id = ?',
      [id],
      (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  create: (data, callback) => {
    pool.query(
      'INSERT INTO route (origen, stops, bus_id, destination) VALUES (?, ?, ?, ?)',
      [data.origen, data.stops, data.bus_id, data.destination],
      (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results)
      }
    )
  },
  update: (data, callback) => {
    pool.query(
      'UPDATE route SET origen = ?, stops = ?, bus_id = ?, destination = ? WHERE id = ?',
      [data.origen, data.stops, data.bus_id, data.destination, data.id],
      (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
  deleted: (data, callback) => {
    pool.query(
      'DELETE FROM route WHERE id = ?',
      [data.id],
      (err, results, fileds) => {
        if (err) {
          return callback(err)
        }

        return callback(null, results[0])
      }
    )
  },
}
