import React from 'react'

import { Box, Grid, Modal, TextField, Typography, Button, MenuItem } from '@mui/material'

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
  }
}

function SchedulePostForm({ openModal, onCloseModal, combo, handlePostModal, onPostSchedule, data, ...props}) {
  return (
    <>
      <Modal open={openModal} onClose={onCloseModal} >
        <Grid container direction='column' justifyContent='center' alignItems='center'>
          <Box component='form' noValidate autoComplete='off' onSubmit={onPostSchedule} sx={Style.modalSx} >
            <div>
              <Typography variant='h6'>Registrar un Nuevo Horario</Typography>
            </div>
            <div>
              <TextField
                required
                type='time'
                variant='standard'
                sx={Style.textFieldSx}
                InputLabelProps={{ shrink: true }}
                value={data.check_in}
                onChange={props.handleChangeCheckIn}
                label='Hora de salida:'
                helperText='Seleccione una hora de salida.'
              />
            </div>
            <div>
              <TextField
                required
                type='time'
                variant='standard'
                sx={Style.textFieldSx}
                InputLabelProps={{ shrink: true }}
                value={data.check_out}
                onChange={props.handleChangeCheckOut}
                label='Hora de llegada:'
                helperText='Seleccione una hora de llegada.'
              />
            </div>
            <div>
              <TextField
                required
                type='date'
                variant='standard'
                sx={Style.textFieldSx}
                InputLabelProps={{ shrink: true }}
                value={data.date}
                onChange={props.handleChangeDate}
                label='Fecha:'
                helperText='Seleccione una fecha.'
              />
            </div>
            <div>
              <TextField
                select
                required
                variant='standard'
                sx={Style.textFieldSx}
                value={data.route_id}
                onChange={props.handleChangeRouteId}
                label='Rutas:'
                helperText='Seleccione una ruta.'
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
                required
                type='text'
                variant='standard'
                sx={Style.textFieldSx}
                value={data.platform}
                onChange={props.handleChangePlatform}
                label='Plataforma:'
                helperText='Especifica una plataforma.'
              />
            </div>
            <div>
              <TextField
                required
                type='number'
                variant='standard'
                sx={Style.textFieldSx}
                value={data.cost}
                onChange={props.handleChangeCost}
                label='Costo:'
                helperText='Especifica el valor.'
              />
            </div>
            <div>
              <Button type='submit'>Nuevo Horario</Button>
            </div>
          </Box>
        </Grid>
      </Modal>
    </>
  )
}

export default SchedulePostForm
