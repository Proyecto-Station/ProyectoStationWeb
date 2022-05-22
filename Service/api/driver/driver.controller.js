const { getDriver, getDriverByDriverId, create, update, deleted } = require('./driver.service')

module.exports = {
  getAllDriver: (req, res) => {
    getDriver((err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        succces: 1,
        data: results
      })
    })
  },
  getDriverById: (req, res) => {
    const id = req.params.id

    getDriverByDriverId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          succces: 0,
          message: 'Driver not found'
        })
      }

      return res.status(200).json({
        succces: 1,
        data: results
      })
    })
  },
  createDriver: (req, res) => {
    const data = req.body

    create(data, (err, results) => {
      if (err) {
        console.log(err)

        return res.status(500).json({
          succces: 0,
          message: 'Database Connection Error'
        })
      }

      return res.status(200).json({
        succces: 1,
        data: results
      })
    })
  },
  updateDriver: (req, res) => {
    const data = req.body

    update(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        succces: 1,
        message: 'Update successfully'
      })
    })
  },
  deleteDriver: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          succces: 0,
          message: 'Driver not found'
        })
      }

      return res.status(200).json({
        succces: 1,
        message: 'Driver deleted successfully'
      })
    })
  }
}