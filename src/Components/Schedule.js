import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, Modal, Typography, Grid, TextField, Button, InputAdornment, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, LocalParking as LocalParkingIcon, MonetizationOn as MonetizationOnIcon } from '@mui/icons-material'

import ScheduleService from '../Services/Api/Schedule.Service'

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

const Schedule = () => {
  const navigate = useNavigate()

  const [rows, setRows] = useState([])
  const [viewModal, setViewModal] = useState()
  const [editModal, setEditModal] = useState({})
  const [comboFill, setComboFill] = useState([])
  const [newModal, setNewModal] = useState({
    check_in: '',
    check_out: '',
    date: '',
    route_id: '',
    platform: '',
    cost: ''
  })

  const [openView, setOpenView] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openNew, setOpenNew] = useState(false)

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
   * * Funciones del Modal Edit
   */
  const ModalEdit = (e, id) => {
    e.preventDefault()

    setComboFill([])
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

  const onCloseModalEdit = () => {
    setOpenEdit(false)
  }

  const onClickModalEdit = (data) => {
    ScheduleService.patchSchedule(data).then(() => {
      onReloadGrid()
      onCloseModalEdit()
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
    })
  }

  /**
   * * Funciones del Modal New
   */
  const ModalNew = (e) => {
    e.preventDefault()

    setComboFill([])
    setOpenNew(false)

    ScheduleService.getAllScheduleRoutes().then((res) => {
      setComboFill(res.data)
      setOpenNew(true)
    })
  }

  const onCloseModalNew = () => {
    setOpenNew(false)
  }

  const onClickModalNew = (data) => {
    ScheduleService.postSchedule(data).then(() => {
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
      <Grid
        container
        item
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          variant="outlined"
          onClick={(e) => ModalNew(e)}
          sx={{
            mb: 2
          }}
        >
          Nuevo Horario
        </Button>
      </Grid>

      <>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            height: 400,
            width: '100%'
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
          }}
        />
      </>

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

      { viewModal && (
        <Modal
          open={openEdit}
          onClose={onCloseModalEdit}
        >
          <Box sx={Style}>
            <Grid container spacing={2} columns={16}>
              <Typography variant='h6' sx={{mb: '15px'}}>
                [{viewModal.id}] Editar Horario de ruta {viewModal.origen} - {viewModal.destination}
              </Typography>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Hora de Salida:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  type='time'
                  value={editModal.check_in}
                  onChange={(e) => setEditModal({...editModal, check_in: e.target.value})}
                  required
                  sx={{ width: 200 }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Hora de Llegada:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  type='time'
                  value={editModal.check_out}
                  onChange={(e) => setEditModal({...editModal, check_out: e.target.value})}
                  required
                  sx={{ width: 200 }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Fecha:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  type='date'
                  value={editModal.date}
                  onChange={(e) => setEditModal({...editModal, date: e.target.value})}
                  required
                  sx={{ width: 200 }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Ruta:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  select
                  required
                  value={editModal.route_id}
                  onChange={(e) => setEditModal({...editModal, route_id: e.target.value})}
                  sx={{ width: 200 }}
                >
                  {comboFill.map((p, i) => (
                    <MenuItem key={i} value={p.id}>
                      {p.origen} - {p.destination}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Plataforma:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  type='text'
                  value={editModal.platform}
                  onChange={(e) => setEditModal({...editModal, platform: e.target.value})}
                  required
                  sx={{ width: 200 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LocalParkingIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography sx={{pt: '4px', pb: '5px', height: '1.4375em'}}>Costo:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant='standard'
                  type='number'
                  value={editModal.cost}
                  onChange={(e) => setEditModal({...editModal, cost: e.target.value})}
                  required
                  sx={{ width: 200 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <MonetizationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid
                container
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  onClick={() => {onClickModalEdit(editModal)}}
                >
                  Editar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}

      { comboFill && (
        <Modal
        open={openNew}
        onClose={onCloseModalNew}
        >
          <Box sx={Style}>
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
            >
              <Grid item>
                <Typography variant='h6' sx={{mb: '15px'}} textAlign='center'>
                  Registrar Nuevo Horario
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  label='Hora de Salida:'
                  helperText='Seleccione una hora de salida'
                  type='time'
                  variant='standard'
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 250, mb: 2}}
                  onChange={(e) => setNewModal({ ...newModal, check_in: e.target.value })}
                />
              </Grid>

              <Grid item>
                <TextField
                  label='Hora de Llegada:'
                  helperText='Seleccione una hora de llegada'
                  type='time'
                  variant='standard'
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 250, mb: 2}}
                  onChange={(e) => setNewModal({ ...newModal, check_out: e.target.value })}
                />
              </Grid>

              <Grid item>
                <TextField
                  label='Fecha:'
                  helperText='Seleccione una fecha'
                  type='date'
                  variant='standard'
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 250, mb: 2}}
                  onChange={(e) => setNewModal({ ...newModal, date: e.target.value })}
                />
              </Grid>

              <Grid item>
                <TextField
                  label='Ruta:'
                  helperText='Seleccione una ruta'
                  variant='standard'
                  select
                  required
                  value={newModal.route_id}
                  sx={{ width: 250, mb: 2}}
                  onChange={(e) => setNewModal({ ...newModal, route_id: e.target.value })}
                >
                  {comboFill.map((p, i) => (
                    <MenuItem key={i} value={p.id}>
                      {p.origen} - {p.destination}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item>
                <TextField
                  label='Plataforma:'
                  helperText='Escriba la plataforma'
                  variant='standard'
                  type='text'
                  required
                  sx={{ width: 250, mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <LocalParkingIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setNewModal({ ...newModal, platform: e.target.value })}
                />
              </Grid>

              <Grid item>
                <TextField
                  label='Valor:'
                  helperText='Escriba el Valor de los boletos'
                  variant='standard'
                  type='number'
                  required
                  sx={{ width: 250, mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <MonetizationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setNewModal({ ...newModal, cost: e.target.value })}
                />
              </Grid>

              <Grid item>
                <Button onClick={() => onClickModalNew(newModal)}>Guardar</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default Schedule
