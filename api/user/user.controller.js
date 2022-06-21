const { getUsers, getUserByUserId, getUserByUserUsername, create, update, deleted } = require('./user.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  getAllUser: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  getUserById: (req, res) => {
    const id = req.params.id

    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'User not found',
        })
      }

      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  createUser: (req, res) => {
    const data = req.body
    const salt = genSaltSync(10)

    data.password = hashSync(data.password, salt)

    create(data, (err, results) => {
      if (err) {
        console.log(err)

        return res.status(500).json({
          success: 0,
          message: 'Database connection error',
        })
      }

      return res.status(200).json({
        success: 1,
        data: results,
      })
    })
  },
  updateUser: (req, res) => {
    const data = req.body
    const salt = genSaltSync(10)

    data.password = hashSync(data.password, salt)

    update(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        success: 1,
        message: 'Update successfully',
      })
    })
  },
  deleteUser: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'User not Found',
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'User deleted successfully',
      })
    })
  },
  login: (req, res) => {
    const data = req.body

    getUserByUserUsername(data.username, (err, results) => {
      if (err) {
        console.log(err)
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Invalid credentials',
        })
      }

      const result = compareSync(data.password, results.password)

      if (results.is_active == 0) {
        return res.status(401).json({
          success: 0,
          message: 'User account is desactivate',
        })
      }

      if (result) {
        result.password = undefined

        const jsontoken = sign({ result: results }, process.env.KEY, {
          expiresIn: '24h',
        })

        return res.status(200).json({
          success: 1,
          message: 'Login successfully',
          userData: {
            id: results.id,
            username: results.username,
            email: results.email,
            permission: results.permission,
            is_active: results.is_active,
          },
          accessToken: jsontoken,
        })
      } else {
        return res.status(401).json({
          success: 0,
          message: 'Invalid credentials',
        })
      }
    })
  },
  checkUserToken: (req, res) => {
    const data = req.body

    try {
      const jswToken = verify(data.token, process.env.KEY)

      if (jswToken) {
        return res.status(200).json({
          success: 1,
          message: 'Token Valid Successfully'
        })
      }
    } catch (err) {
      return res.status(401).json({
        success: 0,
        message: 'Token Invalid Failed'
      })
    }
  }
}
