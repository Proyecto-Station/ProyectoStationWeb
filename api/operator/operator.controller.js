const { getOperator, getOperatorByOpereratorId, create, update, deleted } = require('./operator.service')

module.exports = {
  getAllOperator: (req, res) => {
    getOperator((err, results) => {
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
  getOperatorById: (req, res) => {
    const id = req.params.id

    getOperatorByOpereratorId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Operator not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createOperator: (req, res) => {
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
  updateOperator: (req, res) => {
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
  deleteOperator: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Operator not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Operator deleted successfully'
      })
    })
  }
}