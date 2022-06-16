import axios from 'axios'
import AuthHeader from '../Auth/Auth.Header'

const getAllSchedule = async () => {
  return await axios.get('schedule/', { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const getDetailsSchedule = async (id) => {
  return await axios.get('schedule/' + id, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const getAllScheduleRoutes = async () => {
  return await axios.get('route/', { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const postSchedule = async (data) => {
  return await axios.post('schedule/', data, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const patchSchedule = async (data) => {
  return await axios.patch('schedule/', data, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const deleteSchedule = async (id) => {
  return await axios.delete('schedule/', { headers: AuthHeader(), data: id }).then((res) => {
    return res.data
  })
}

const getDataFifteenDays = async (data) => {
  return await axios.post('schedule/filter/all', data, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const ScheduleService = {
  getAllSchedule,
  getDetailsSchedule,
  getAllScheduleRoutes,
  getDataFifteenDays,
  postSchedule,
  patchSchedule,
  deleteSchedule
}

export default ScheduleService
