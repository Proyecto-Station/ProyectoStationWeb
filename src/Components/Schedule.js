import React, { useState, useEffect } from 'react'

import { IconButton, Grid, Button, Container, } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material'

import ScheduleService from '../Services/Api/Schedule.Service'

import TableRefill from './Utils/TableRefill'
import SnackbarInfo from './Utils/SnackbarInfo'

import SchedulePostForm from './Other/Schedule/SchedulePostForm'
import ScheduleEditForm from './Other/Schedule/ScheduleEditForm'
import ScheduleViewForm from './Other/Schedule/ScheduleViewForm'

import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/Api/Auth.Service'

function Schedule() {
  const [rows, setRows] = useState([])

  const [newModal, setNewModal] = useState({
    check_in: '',
    check_out: '',
    date: '',
    route_id: '',
    platform: '',
    cost: ''
  })
  const [editModal, setEditModal] = useState({
    id: '',
    check_in: '',
    check_out: '',
    date: '',
    route_id: '',
    platform: '',
    cost: ''
  })
  const [viewModal, setViewModal] = useState()

  const [comboFill, setComboFill] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const [openNew, setOpenNew] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openNotify, setOpenNotify] = useState(false)

  const columns = [
    {
      field: 'id', headerName: '#', align: 'center', headerAlign: 'center', width: 90
    },
    {
      field: 'check_in', headerName: 'Salida', align: 'center', headerAlign: 'center', width: 100,
      valueGetter: (params) => `${params.row.check_in.slice(0, 5)}`
    },
    {
      field: 'check_out', headerName: 'Llegada', align: 'center', headerAlign: 'center', width: 100,
      valueGetter: (params) => `${params.row.check_out.slice(0, 5)}`
    },
    {
      field: 'date', headerName: 'Fecha', align: 'center', headerAlign: 'center', width: 120,
      valueGetter: (params) => `${params.row.date.slice(8, 10)}${params.row.date.slice(4, 8)}${params.row.date.slice(0, 4)}`
    },
    {
      field: 'origen', headerName: 'Origen', align: 'center', headerAlign: 'center', width: 200
    },
    {
      field: 'destination', headerName: 'Destino', align: 'center', headerAlign: 'center', width: 200
    },
    {
      field: 'platform', headerName: 'Plataforma', align: 'center', headerAlign: 'center', width: 100
    },
    {
      field: 'company_name',
      headerName: 'Empresa',
      align: 'center',
      headerAlign: 'center',
      width: 100,
    },
    {
      field: 'cost',
      headerName: 'Valor',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      valueGetter: (params) => `$${params.row.cost}`,
    },
    {
      field: 'action', headerName: 'Acciones', disableClickEventBubbling: true, align: 'center', sortable: false, headerAlign: 'center', width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            variant='contained'
            color='secondary'
            onClick={(e) => ModalView(e, params.id)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            variant='contained'
            color='warning'
            sx={{ ml: '20px', mr: '20px' }}
            onClick={(e) => ModalEdit(e, params.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant='contained'
            color='error'
            onClick={(e) => onClickDelete(e, params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    }
  ]

  const navigate = useNavigate()

  /**
   * * Estado al Cargar la pagina
   */

   useEffect(() => {
    ScheduleService.getAllSchedule().then((res) => {
      setRows(res.data)
    })

    ScheduleService.getAllScheduleRoutes().then((res) => {
      setComboFill(res.data)
    })

    getUser()
  }, [])

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('data'))

    if (user) {
      if (typeof user === 'object') {
        try {
          AuthService.checkUser(user.accessToken).then((res) => {
            return res.data
          })

          return true
        } catch (err) {
          return navigate('/')
        }
      } else {
        return navigate('/')
      }
    } else {
      return navigate('/')
    }
  }


  /**
   * * Funciones del Modal View
   */
  const ModalView = (e, id) => {
    e.preventDefault()
    setViewModal('')

    ScheduleService.getDetailsSchedule(id).then((res) => {
      setViewModal(res.data)
      setOpenView(true)
    })
  }

  /**
   * * Funciones de Editar
   */
  const ModalEdit = (e, id) => {
    e.preventDefault()

    setOpenEdit(false)
    ScheduleService.getDetailsSchedule(id).then((res) => {
      setEditModal({
        id: id,
        check_in: res.data.check_in.slice(0, 5),
        check_out: res.data.check_out.slice(0, 5),
        date: res.data.date.slice(0, 10),
        route_id: res.data.route_id,
        platform: res.data.platform,
        cost: res.data.cost,
      })

      setOpenEdit(true)
    })
  }

  const onClickModalEdit = (e) => {
    e.preventDefault()

    ScheduleService.patchSchedule(editModal).then(() => {
      onReloadGrid()
      setEditModal({
        id: '',
        check_in: '',
        check_out: '',
        date: '',
        route_id: '',
        platform: '',
        cost: ''
      })
      setOpenEdit(false)

      setType('info')
      setTitle('Modificado!!!')
      setMessage('Horario Modificado Correctamente')
      setVisible(true)
      setOpenNotify(true)
    })
  }

  /**
   * * Funciones de Insertar
   */
  const onClickModalNew = (e) => {
    e.preventDefault()

    ScheduleService.postSchedule(newModal).then(() => {
      onReloadGrid()
      setNewModal({
        check_in: '',
        check_out: '',
        date: '',
        route_id: '',
        platform: '',
        cost: ''
      })
      setOpenNew(false)

      setType('info')
      setTitle('Creado!!!')
      setMessage('Horario Creado Correctamente')
      setVisible(true)
      setOpenNotify(true)
    })
  }

  /**
   * * Funcion de Eliminar
   */
  const onClickDelete = (e, id) => {
    e.preventDefault()

    const data = JSON.stringify({ id: id })

    ScheduleService.deleteSchedule(JSON.parse(data)).then(() => {
      onReloadGrid()

      setType('success')
      setTitle('Eliminado!!!')
      setMessage('Horario Eliminado Correctamente')
      setVisible(true)
      setOpenNotify(true)
    })
  }

  /**
   * * Recargar el Data Grid
   */
  const onReloadGrid = () => {
    ScheduleService.getAllSchedule().then((res) => {
      setRows(res.data)
    })
  }

  /**
   * * Renderizado de la Pagina
   */
  return (
    <>
      { openNotify && visible && (
        <div>
          <SnackbarInfo
            open={openNotify}
            message={message}
            title={title}
            type={type}
            handelChangeNotify={ () => setOpenNotify(false) }
          />
        </div>
      )}

      <Container sx={{ mt: 10 }} minwidth='xs' maxWidth='xxl'>
        <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
          <Button variant='outlined' sx={{ mb: 2}} onClick={ () => setOpenNew(true) }>Nuevo Horario</Button>
        </Grid>

        <div>
          <TableRefill columns={columns} rows={rows} />
        </div>
      </Container>

      { openView &&  viewModal &&(
        <ScheduleViewForm
          openModal={openView}
          data={viewModal}
          onCloseModal={() => setOpenView(false)}
        />
      )}

      { comboFill && openEdit && (
        <ScheduleEditForm
          openModal={openEdit}
          data={editModal}
          combo={comboFill}
          onCloseModal={() => setOpenEdit(false)}
          handleChangeCheckIn={ ({target}) => setEditModal({ ...editModal, check_in: target.value}) }
          handleChangeCheckOut={ ({target}) => setEditModal({ ...editModal, check_out: target.value }) }
          handleChangeDate={ ({target}) => setEditModal({ ...editModal, date: target.value }) }
          handleChangeRouteId={ ({target}) => setEditModal({ ...editModal, route_id: target.value }) }
          handleChangePlatform={ ({target}) => setEditModal({ ...editModal, platform: target.value }) }
          handleChangeCost={ ({target}) => setEditModal({ ...editModal, cost: target.value }) }
          onEditSchedule={onClickModalEdit}
        />
      )}

      { comboFill && openNew && (
        <SchedulePostForm
          openModal={openNew}
          data={newModal}
          combo={comboFill}
          onCloseModal={() => setOpenNew(false)}
          handleChangeCheckIn={ ({target}) => setNewModal({ ...newModal, check_in: target.value}) }
          handleChangeCheckOut={ ({target}) => setNewModal({ ...newModal, check_out: target.value }) }
          handleChangeDate={ ({target}) => setNewModal({ ...newModal, date: target.value }) }
          handleChangeRouteId={ ({target}) => setNewModal({ ...newModal, route_id: target.value }) }
          handleChangePlatform={ ({target}) => setNewModal({ ...newModal, platform: target.value }) }
          handleChangeCost={ ({target}) => setNewModal({ ...newModal, cost: target.value }) }
          onPostSchedule={onClickModalNew}
        />
      )}
    </>
  )
}

export default Schedule
