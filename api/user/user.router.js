const { getAllUser, getUserById, getUserByUser, createUser, updateUser, deleteUser } = require('./user.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllUser)
router.get('/:id', checkToken, getUserById)
router.post('/', createUser)
router.patch('/', checkToken, updateUser)
router.delete('/', checkToken, deleteUser)

module.exports = router
