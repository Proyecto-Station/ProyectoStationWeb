import React from 'react'

import { Box, Grid, Modal, Typography, Paper, Button } from '@mui/material'

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
  buttonCss: {
    display: 'block',
    ml: 'auto',
    mr: 'auto',
    mt: 1
  }
}

function ScheduleViewForm({ openModal, onCloseModal, data }) {
  return (
    <>
      <Modal open={openModal} onClose={onCloseModal} >
        <Paper sx={Style.modalSx}>
          <Box component='div' sx={{ mt: 1, mb: 1 }}>
            <Typography variant='h6'>[{data.id}] Info Viaje: {data.origen} - {data.destination}</Typography>
          </Box>
          <Box component='div'>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Hora de Salida:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.check_in.slice(0, 5)}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div' sx={{mt: 2, mb: 2}}>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Hora de Llegada:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.check_out.slice(0, 5)}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div'>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Fecha:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.date.slice(8, 10)}/{data.date.slice(5, 7)}/{data.date.slice(0, 4)}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div' sx={{mt: 2, mb: 2}}>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Anden:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.platform}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div'>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Valor:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>${data.cost}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div' sx={{mt: 2, mb: 2}}>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Empresa:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.company_name}</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box component='div'>
            <Grid container>
              <Grid item xs={5}>
                <Typography>Paradas:</Typography>
              </Grid>
              <Grid item xs={6}>
                {data.stops.map((p, i) => (
                  <Typography key={i} component='li'>{p.route}</Typography>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Box component='div'>
            <Button onClick={onCloseModal} variant='outlined' color='error' sx={Style.buttonCss}>Salir</Button>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}

export default ScheduleViewForm
