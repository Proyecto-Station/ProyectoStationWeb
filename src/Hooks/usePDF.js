import { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import ScheduleService from '../Services/Api/Schedule.Service'

function sumarFecha(x, y) {
  x.setDate(x.getDate() + y)
  return x
}

export function usePDF() {
  const [allData, setAllData] = useState()
  const [fifteenData, setFifteenData] = useState()
  const [thirthyData, setThirthyData] = useState()

  const reportAllData = () => {
    setAllData()

    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    ScheduleService.getAllSchedule().then((res) => setAllData(res.data))

    const data = allData.map((p) => [p.id, p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

    const content = {
      head: headers,
      body: data
    }

    const date = new Date(Date.now())

    let dateFormat = date.toISOString().slice(0, 10)

    doc.autoTable(content)
    doc.save('report_' + dateFormat + '.pdf')
  }

  const reportFifteenDays = () => {
    setFifteenData()

    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    const dateNow = new Date(Date.now()), dateEnd = new Date(Date.now())
    const dateEnding = sumarFecha(dateEnd, 15)

    const data = {
      date_init: dateNow.toISOString().slice(0, 10),
      date_end: dateEnding.toISOString().slice(0, 10)
    }

    ScheduleService.getDataFifteenDays(data).then((res) => setFifteenData(res.data))

    const dataTable = fifteenData.map((p, i) => [(i + 1), p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

    const content = {
      head: headers,
      body: dataTable
    }

    doc.autoTable(content)
    doc.save('report_' + dateNow.toISOString().slice(0, 10) + '.pdf')
  }

  const reportThirthyDays = () => {
    setThirthyData()

    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    const dateNow = new Date(Date.now()), dateEnd = new Date(Date.now())
    const dateEnding = sumarFecha(dateEnd, 30)

    const data = {
      date_init: dateNow.toISOString().slice(0, 10),
      date_end: dateEnding.toISOString().slice(0, 10)
    }

    ScheduleService.getDataFifteenDays(data).then((res) => setThirthyData(res.data))

    const dataTable = thirthyData.map((p, i) => [(i + 1), p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

    const content = {
      head: headers,
      body: dataTable
    }

    doc.autoTable(content)
    doc.save('report_' + dateNow.toISOString().slice(0, 10) + '.pdf')
  }

  return {
    reportAllData,
    reportFifteenDays,
    reportThirthyDays
  }
}
