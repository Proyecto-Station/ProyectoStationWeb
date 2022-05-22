const { getAccount, getAccountByAccountID, create, update, deleted } = require('./account.service')

module.exports = {
  getAllAccount: (req, res) => {
    getAccount((err, results) => {
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
  getAccountById: (req, res) => {
    const id = req.params.id

    getAccountByAccountID(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Account not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createAccount: (req, res) => {
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
  updateAccount: (req, res) => {
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
  deleteAccount: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Account not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Account deleted successfully'
      })
    })
  } 
}