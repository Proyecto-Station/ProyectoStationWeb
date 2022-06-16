import jsPDF from 'jspdf'
import 'jspdf-autotable'

import ScheduleService from '../Services/Api/Schedule.Service'

function sumarFecha(x, y) {
  x.setDate(x.getDate() + y)
  return x
}

export function usePDF() {
  const reportAllData = async () => {
    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    try {
      ScheduleService.getAllSchedule().then((res) => {
        const body = res.data

        const data = body.map((p, i) => [(i + 1), p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

        const content = {
          head: headers,
          body: data
        }

        const date = new Date(Date.now())

        let dateFormat = date.toISOString().slice(0, 10)

        doc.autoTable(content)
        doc.save('report_' + dateFormat + '.pdf')
      })
    } catch (TypeError) { }
  }

  const reportFifteenDays = async () => {
    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    const dateNow = new Date(Date.now()), dateEnd = new Date(Date.now())
    const dateEnding = sumarFecha(dateEnd, 15)

    const data = {
      date_init: dateNow.toISOString().slice(0, 10),
      date_end: dateEnding.toISOString().slice(0, 10)
    }

    try {
      ScheduleService.getDataFifteenDays(data).then((res) => {
        const body = res.data

        const dataTable = body.map((p, i) => [(i + 1), p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

        const content = {
          head: headers,
          body: dataTable
        }

        doc.autoTable(content)
        doc.save('report_' + dateNow.toISOString().slice(0, 10) + '.pdf')
      })
    } catch (TypeError) { }
  }

  const reportThirthyDays = async () => {
    const doc = new jsPDF()
    const headers = [['#', 'Hora Salida', 'Hora Llegada', 'Fecha', 'Origen', 'Destino', 'Empresa']]

    const dateNow = new Date(Date.now()), dateEnd = new Date(Date.now())
    const dateEnding = sumarFecha(dateEnd, 30)

    const data = {
      date_init: dateNow.toISOString().slice(0, 10),
      date_end: dateEnding.toISOString().slice(0, 10)
    }

    try {
      ScheduleService.getDataFifteenDays(data).then((res) => {
        const body = res.data

        const dataTable = body.map((p, i) => [(i + 1), p.check_in.slice(0, 5), p.check_out.slice(0, 5), p.date.slice(0, 10), p.origen, p.destination, p.company_name])

        const content = {
          head: headers,
          body: dataTable
        }

        doc.autoTable(content)
        doc.save('report_' + dateNow.toISOString().slice(0, 10) + '.pdf')
      })
    } catch (TypeError) { }
  }

  return {
    reportAllData,
    reportFifteenDays,
    reportThirthyDays
  }
}
