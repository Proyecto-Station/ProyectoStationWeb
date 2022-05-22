const { getCompany, getCompanyByCompanyId, create, update, deleted } = require('./company.service')

module.exports = {
  getAllCompany: (req, res) => {
    getCompany((err, results) => {
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
  getCompanyById: (req, res) => {
    const id = req.params.id

    getCompanyByCompanyId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Company not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createCompany: (req, res) => {
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
  updateCompany: (req, res) => {
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
  deleteCompany: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Company not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Company deleted successfully'
      })
    })
  }
}