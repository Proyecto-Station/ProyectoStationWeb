const { getRoute, getRouteByRouteID, create, update, deleted } = require('./route.service')

module.exports = {
  getAllRoute: (req, res) => {
    getRoute((err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  getRouteById: (req, res) => {
    const id = req.params.id

    getRouteByRouteID(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Route not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createRoute: (req, res) => {
    const data = req.body

    create(data, (err, results) => {
      if (err) {
        console.log(err)

        return res.status(500).json({
          success: 0,
          message: 'Database Connection Error'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results 
      })
    })
  },
  updateRoute: (req, res) => {
    const data = req.body

    update(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        success: 1,
        message: 'Update successfully'
      })
    })
  },
  deleteRoute: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Route not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Route deleted successfully'
      })
    })
  }
}