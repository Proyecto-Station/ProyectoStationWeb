import React from 'react'
import { useField } from '../../../Hooks/useField'

import ScheduleService from '../../../Services/Api/Schedule.Service'

import { Box, Grid, Modal, TextField, Typography, Button, MenuItem, Paper } from '@mui/material'

const Style = {
  textFieldSx: {
    width: 250,
    mb: 2
  },
  modalSx: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  },
  button: {
    display: 'block',
    ml: 'auto',
    mr: 'auto',
    mt: 1
  }
}

function SchedulePostForm({ openModal, onCloseModal, combo, onReloadTable, onMessage }) {
  const check_in = useField({ type: 'time' })
  const check_out = useField({ type: 'time' })
  const date = useField({ type: 'date' })
  const route_id = useField({ type: 'select'})
  const platform = useField({ type: 'text' })
  const cost = useField({ type: 'number' })

  const onPostForm = (e) => {
    e.preventDefault()

    const data = {
      check_in: check_in.value,
      check_out: check_out.value,
      date: date.value,
      route_id: route_id.value,
      platform: platform.value,
      cost: cost.value
    }

    if (!data.check_in) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    } else if (!data.check_out) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    } else if (!data.date) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    } else if (!data.route_id) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    } else if (!data.platform) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    } else if (!data.cost) {
      return onMessage('Valores Indefinidos', 'Ingrese algun dato en los campos requeridos', 'error', true)
    }

    ScheduleService.postSchedule(data).then((res) => {
      console.log(res)
      onReloadTable()
      onCloseModal()
      onMessage('Nuevo Horario Registrado', 'Se ha registrado Exitosamente', 'success', true)
    })
  }


  return (
    <>
      <Modal open={openModal} onClose={onCloseModal} >
        <Paper sx={Style.modalSx}>
          <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Box component='form' noValidate autoComplete='off' onSubmit={onPostForm}>
              <div>
                <Typography variant='h6'>Registrar un Nuevo Horario</Typography>
              </div>
              <div>
                <TextField
                  label='Hora de salida:'
                  helperText='Seleccione una hora de salida.'
                  variant='standard'
                  InputLabelProps={{ shrink: true }}
                  required
                  { ...check_in }
                  sx={Style.textFieldSx}
                />
              </div>
              <div>
                <TextField
                  label='Hora de llegada:'
                  helperText='Seleccione una hora de llegada.'
                  variant='standard'
                  InputLabelProps={{ shrink: true }}
                  required
                  { ...check_out }
                  sx={Style.textFieldSx}
                />
              </div>
              <div>
                <TextField
                  label='Fecha:'
                  helperText='Seleccione una fecha.'
                  variant='standard'
                  InputLabelProps={{ shrink: true }}
                  required
                  { ...date }
                  sx={Style.textFieldSx}
                />
              </div>
              <div>
                <TextField
                  label='Rutas:'
                  helperText='Seleccione una ruta.'
                  variant='standard'
                  select
                  required
                  { ...route_id }
                  sx={Style.textFieldSx}
                >
                  { combo.map((p, i) => (
                    <MenuItem key={i} value={p.id}>
                      {p.origen} - {p.destination}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div>
                <TextField
                  label='Plataforma:'
                  helperText='Especifica una plataforma.'
                  variant='standard'
                  required
                  { ...platform }
                  sx={Style.textFieldSx}
                />
              </div>
              <div>
                <TextField
                  label='Costo:'
                  helperText='Especifica el valor.'
                  variant='standard'
                  required
                  { ...cost }
                  sx={Style.textFieldSx}
                />
              </div>
              <div>
                <Button type='submit' variant='outlined' color='success' sx={ Style.button }>Nuevo Horario</Button>
                <Button onClick={onCloseModal} variant='outlined' color='error' sx={ Style.button }>Salir</Button>
              </div>
            </Box>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

export default SchedulePostForm
