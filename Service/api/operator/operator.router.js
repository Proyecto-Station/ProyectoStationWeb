const { getAllOperator, getOperatorById, createOperator, updateOperator, deleteOperator } = require('./operator.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllOperator)
router.get('/:id', checkToken, getOperatorById)
router.post('/', checkToken, createOperator)
router.patch('/', checkToken, updateOperator)
router.delete('/', checkToken, deleteOperator)

module.exports = router