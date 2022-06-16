import axios from 'axios'
import AuthHeader from '../Auth/Auth.Header'

const getAllSchedule = async () => {
  return axios.get('schedule/', { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const getDetailsSchedule = async (id) => {
  return axios.get('schedule/' + id, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const getAllScheduleRoutes = async () => {
  return axios.get('route/', { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const postSchedule = async (data) => {
  return axios.post('schedule/', data, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const patchSchedule = async (data) => {
  return axios.patch('schedule/', data, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const deleteSchedule = async (id) => {
  return axios.delete('schedule/', { headers: AuthHeader(), data: id }).then((res) => {
    return res.data
  })
}

const getDataFifteenDays = async (data) => {
  return axios.post('schedule/filter/date', data, { headers: AuthHeader() }).then((res) => {
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
