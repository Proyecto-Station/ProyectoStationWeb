const { getAllBussed, getBussedById, createBussed, updateBussed, deleteBussed } = require('./bussed.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllBussed)
router.get('/:id', checkToken, getBussedById)
router.post('/', checkToken, createBussed)
router.patch('/', checkToken, updateBussed)
router.delete('/', checkToken, deleteBussed)

module.exports = router