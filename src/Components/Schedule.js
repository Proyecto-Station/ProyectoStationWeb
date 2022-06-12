import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, Modal, Typography, Grid, Button, } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material'

import ScheduleService from '../Services/Api/Schedule.Service'
import TableRefill from './Utils/TableRefill'
import SchedulePostForm from './Other/SchedulePostForm'
import SnackbarInfo from './Utils/SnackbarInfo'
import ScheduleEditForm from './Other/ScheduleEditForm'

const Style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Schedule() {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])

  const [viewModal, setViewModal] = useState()

  const [openView, setOpenView] = useState(false)

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

  const [comboFill, setComboFill] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [visible, setVisible] = useState(false)

  const [openNew, setOpenNew] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
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

   /**
   * * Estado al Cargar la pagina
   */
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('data'))

      if (!data) {
        navigate('/')
        window.location.reload()
      } else {
        if (!data.accessToken){
          navigate('/')
          window.location.reload()
        }
      }

      ScheduleService.getAllSchedule().then((res) => {
        setRows(res.data)
      })

      ScheduleService.getAllScheduleRoutes().then((res) => {
        setComboFill(res.data)
      })
    }, [navigate])

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

  const onCloseModalView = () => {
    setOpenView(false)
  }

  /**
   * * Funciones de Editar
   */
  const ModalEdit = (e, id) => {
    e.preventDefault()

    setViewModal({})
    setOpenEdit(false)

    ScheduleService.getDetailsSchedule(id).then((res) => {
      setViewModal(res.data)
      setEditModal({
        check_in: res.data.check_in.slice(0, 5),
        check_out: res.data.check_out.slice(0, 5),
        date: res.data.date.slice(0, 10),
        route_id: res.data.route_id,
        platform: res.data.platform,
        cost: res.data.cost,
        id: res.data.id,
      })
      setOpenEdit(true)
    })

    ScheduleService.getAllScheduleRoutes().then((res) => {
      setComboFill(res.data)
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

      setVisible(true)
      setOpenNotify(true)
      setType('info')
      setTitle('Modificado!!!')
      setMessage('Horario Modificado Correctamente')
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

      setVisible(true)
      setOpenNotify(true)
      setType('info')
      setTitle('Creado!!!')
      setMessage('Horario Creado Correctamente')
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

      setVisible(true)
      setOpenNotify(true)
      setType('success')
      setTitle('Eliminado!!!')
      setMessage('Horario Eliminado Correctamente')
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

      <Grid container direction='row' justifyContent='flex-end' alignItems='center'>
        <Button variant='outlined' sx={{ mb: 2}} onClick={ () => setOpenNew(true) }>Nuevo Horario</Button>
      </Grid>

      <div>
        <TableRefill columns={columns} rows={rows} />
      </div>

      { viewModal && (
        <Modal
          open={openView}
          onClose={onCloseModalView}
        >
          <Box sx={Style}>
            <Grid container spacing={2} columns={16}>
              <Typography variant='h6' sx={{mb: '15px'}}>
                [{viewModal.id}] Informacion de ruta {viewModal.origen} - {viewModal.destination}
              </Typography>

              <Grid item xs={6}>
                <Typography>Hora de Salida:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.check_in.slice(0, 5)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Hora de Llegada:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.check_out.slice(0, 5)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Fecha:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.date.slice(0, 10)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Origen:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.origen}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Destino:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.destination}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Plataforma:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.platform}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Valor:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>${viewModal.cost}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Empresa:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{viewModal.company_name}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Paradas:</Typography>
              </Grid>
              <Grid item xs={8}>
                {viewModal.stops.map((p, i) => (
                  <Typography component='li' key={i}>{p.route}</Typography>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Modal>
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
