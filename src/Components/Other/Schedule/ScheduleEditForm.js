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

function ScheduleEditForm({ openModal, onCloseModal, onEditSchedule, combo, data, ...props }) {
  return (
    <>
      <Modal open={openModal} onClose={onCloseModal} >
        <Grid container direction='column' justifyContent='center' alignItems='center' >
          <Box component='form' noValidate autoComplete='off' onSubmit={onEditSchedule} sx={Style.modalSx} >
            <div>
              <Typography variant='h6'>[{data.id}] Editar Horario</Typography>
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
                label='Cambiar hora de salida:'
                helperText='Seleccione una nueva hora de salida.'
              />
            </div>
            <div>
              <TextField
                required
                type='time'
                variant='standard'
                sx={Style.textFieldSx}
                InputLabelProps={{ shrink: true }}
                value={data.check_in}
                onChange={props.handleChangeCheckOut}
                label='Cambiar hora de llegada:'
                helperText='Seleccione una nueva hora de llegada.'
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
                label='Cambiar Fecha:'
                helperText='Seleccione una nueva fecha.'
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
                label='Cambiar Ruta:'
                helperText='Seleccione una nueva ruta.'
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
                label='Cambiar Plataforma:'
                helperText='Especifica una nueva plataforma.'
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
                label='Cambiar Costo:'
                helperText='Especifica una nueva valor.'
              />
            </div>
            <div>
              <Button type='submit'>Editar Horario</Button>
              <Button onClick={onCloseModal}>Salir</Button>
            </div>
          </Box>
        </Grid>
      </Modal>
    </>
  )
}

export default ScheduleEditForm
