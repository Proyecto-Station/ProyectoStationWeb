const { getAllSchedule, getScheduleById, getScheduleByEdit, getScheduleByDate, createSchedule, updateSchedule, deleteSchedule } = require('./schedule.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllSchedule)
router.get('/:id', checkToken, getScheduleById)
router.get('/edit/:id', checkToken, getScheduleByEdit)
router.post('/filter/date', checkToken, getScheduleByDate)
router.post('/', checkToken, createSchedule)
router.patch('/', checkToken, updateSchedule)
router.delete('/', checkToken, deleteSchedule)

module.exports = router
