const { getAllSchedule, getScheduleById, createSchedule, updateSchedule, deleteSchedule } = require('./schedule.controller')
const { checkToken } = require('../../auth/check.token')
const router = require('express').Router()

router.get('/', checkToken, getAllSchedule)
router.get('/:id', checkToken, getScheduleById)
router.post('/', checkToken, createSchedule)
router.patch('/', checkToken, updateSchedule)
router.delete('/', checkToken, deleteSchedule)

module.exports = router