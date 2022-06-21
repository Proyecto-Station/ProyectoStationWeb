const { getAllAccount, getAccountById, createAccount, updateAccount, deleteAccount } = require('./account.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllAccount)
router.get('/:id', checkToken, getAccountById)
router.post('/', checkToken, createAccount)
router.patch('/', checkToken, updateAccount)
router.delete('/', checkToken, deleteAccount)

module.exports = router