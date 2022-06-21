const { login, checkUserToken } = require('./user.controller')
const router = require('express').Router()

router.post('/login', login)
router.post('/check', checkUserToken)

module.exports = router
