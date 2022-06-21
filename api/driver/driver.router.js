const { getAllDriver, getDriverById, createDriver, updateDriver, deleteDriver } = require('./driver.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllDriver)
router.get('/:id', checkToken, getDriverById)
router.post('/', checkToken, createDriver)
router.patch('/', checkToken, updateDriver)
router.delete('/', checkToken, deleteDriver)

module.exports = router