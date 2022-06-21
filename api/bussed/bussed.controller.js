const { getBussed, getBussedByBussedId, create, update, deleted } = require('./bussed.service')

module.exports = {
  getAllBussed: (req, res) => {
    getBussed((err, results) => {
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
  getBussedById: (req, res) => {
    const id = req.params.id

    getBussedByBussedId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Bussed not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createBussed: (req, res) => {
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
  updateBussed: (req, res) => {
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
  deleteBussed: (req, res) => {
    const data = req.body
    
    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Bussed not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Bussed deleted successfully'
      })
    })
  }
}