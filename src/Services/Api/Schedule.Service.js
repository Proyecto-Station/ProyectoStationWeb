import axios from 'axios'
import AuthHeader from '../Guard/Auth.Header'

class ScheduleService {
  async getAllSchedule() {
    return await axios.get('schedule/', { headers: AuthHeader() })
  }

  async getDetailsSchedule(id) {
    return await axios
      .get('schedule/' + id, { headers: AuthHeader() })
      .then((res) => {
        return res.data
      })
  }

  async getDetailsEditSchedule(id) {
    return await axios
      .get('schedule/edit/' + id, { headers: AuthHeader() })
      .then((res) => {
        return res.data
      })
  }

  async getDetailsRoute() {
    return await axios.get('route/', { headers: AuthHeader() }).then((res) => {
      return res.data
    })
  }

  async patchDetailsSchedule(
    dataID,
    checkIn,
    checkOut,
    dataDate,
    route,
    dataPlatform,
    dataCost
  ) {
    const body = {
      id: dataID,
      check_in: checkIn,
      check_out: checkOut,
      date: dataDate,
      route_id: route,
      platform: dataPlatform,
      cost: dataCost,
    }

    return await axios.patch('schedule/', body)
  }

  async insertSchedule(
    checkIn,
    checkOut,
    dateData,
    route,
    dataPlatform,
    dataCost
  ) {
    const body = {
      check_in: checkIn,
      check_out: checkOut,
      date: dateData,
      route_id: route,
      platform: dataPlatform,
      cost: dataCost,
    }

    return await axios.post('schedule/', body).then((res) => {
      console.log(res)
    })
  }

  async deleteSchedule(dataID) {
    const body = { id: dataID }

    const config = {
      data: body,
    }

    return await axios.delete('schedule/', config)
  }
}

export default new ScheduleService()
