const { getAllUser, getUserById, createUser, updateUser, deleteUser, login } = require('./user.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllUser)
router.get('/:id', checkToken, getUserById)
router.post('/', checkToken, createUser)
router.patch('/', checkToken, updateUser)
router.delete('/', checkToken, deleteUser)

router.post('/login', login)

module.exports = router