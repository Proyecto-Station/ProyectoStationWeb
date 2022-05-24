const { getSchedule, getScheduleByScheduleId, create, update, deleted } = require('./schedule.service')

module.exports = {
  getAllSchedule: (req, res) => {
    getSchedule((err, results) => {
      if (err) {
        console.log(err)
        return
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  getScheduleById: (req, res) => {
    const id = req.params.id
    
    getScheduleByScheduleId(id, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Schedule not found'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  createSchedule: (req, res) => {
    const data = req.body

    create(data, (err, results) => {
      if (err) {
        console.log(err)

        return res.status(500).json({
          success: 0,
          message: 'Database Connection Error'
        })
      }

      return res.status(200).json({
        success: 1,
        data: results
      })
    })
  },
  updateSchedule: (req, res) => {
    const data = req.body

    update(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Schedule not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Update successfully'
      })
    })
  },
  deleteSchedule: (req, res) => {
    const data = req.body

    deleted(data, (err, results) => {
      if (err) {
        console.log(err)
        return
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Schedule not found'
        })
      }

      return res.status(200).json({
        success: 1,
        message: 'Schedule deleted successfully'
      })
    })
  }
}