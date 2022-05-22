const { getAllRoute, getRouteById, createRoute, updateRoute, deleteRoute} = require('./route.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllRoute)
router.get('/:id', checkToken, getRouteById)
router.post('/', checkToken, createRoute)
router.patch('/', checkToken, updateRoute)
router.delete('/', checkToken, deleteRoute)

module.exports = router