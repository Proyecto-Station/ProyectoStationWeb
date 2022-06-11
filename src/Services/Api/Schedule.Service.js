import axios from 'axios'
import AuthHeader from '../Auth/Auth.Header'

const getAllSchedule = () => {
  return axios.get('schedule/', { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}

const getDetailsSchedule = (id) => {
  return axios.get('schedule/' + id, { headers: AuthHeader() }).then((res) => {
    return res.data
  })
}



const ScheduleService = {
  getAllSchedule,
  getDetailsSchedule
}

export default ScheduleService
