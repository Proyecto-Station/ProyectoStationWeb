import { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import ScheduleService from '../Services/Api/Schedule.Service'

export function usePDF() {
  const [schedule, setSchedule] = useState()

  const reportAllData = () => {
    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    ScheduleService.getAllSchedule().then((res) => setSchedule(res.data))

    const data = schedule.map((p) => [p.id, p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

    const content = {
      head: headers,
      body: data
    }

    const date = new Date(Date.now())

    let dateFormat = date.toISOString().slice(0, 10)

    doc.autoTable(content)
    doc.save('report_' + dateFormat + '.pdf')
  }


  return {
    schedule,
    reportAllData
  }
}
