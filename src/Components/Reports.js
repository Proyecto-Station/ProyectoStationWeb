import React, { useState } from 'react'
import { Button, Container, Grid, Card, CardMedia, CardContent, Typography, Select, MenuItem } from '@mui/material'

import { usePDF } from '../Hooks/usePDF'

function Reports() {
  const { reportAllData, reportFifteenDays, reportThirthyDays } = usePDF()

  const [select, setSelect] = useState('')
  const [value, setValue] = useState(false)

  const SelectSchedule = {
    all: () => reportAllData(),
    fifteen: () => reportFifteenDays(),
    tirthy: () => reportThirthyDays()
  }

  return (
    <>
      <Container sx={{ mt: 10 }} minwidth='xs' maxWidth='xxl'>
        <Grid container spacing={2}>
          <Grid item>
            <Card sx={{ maxWidth: 245 }}>
              <CardMedia
                component='img'
                alt='img'
                height='140'
                image='https://www.alstom.com/sites/alstom.com/files/2019/05/16/Bus%20Electrico51.jpg'
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component="div">Reportes de Horarios</Typography>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  <Button onClick={() => reportThirthyDays()} sx={{display: 'block', ml: 'auto', mr: 'auto', mt: 2}} variant='outlined'>Click</Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 245 }}>
              <CardMedia
                component='img'
                alt='img'
                height='140'
                image='https://www.alstom.com/sites/alstom.com/files/2019/05/16/Bus%20Electrico51.jpg'
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component="div">Reportes de Horarios</Typography>
                <Typography variant='body2'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Typography>

                <div>
                  <Select
                    value={select}
                    onChange={({target}) => { setSelect(target.value); setValue(true) }}
                    variant='standard'
                    sx={{ minWidth: 200, display: 'block', ml: 'auto', mr: 'auto', mt: 2 }}
                  >
                    <MenuItem value={'all'}>Todos</MenuItem>
                    <MenuItem value={'fifteen'}>15 Dias</MenuItem>
                    <MenuItem value={'tirthy'}>30 Dias</MenuItem>
                  </Select>
                </div>

                { value ? (
                  <Button variant='outlined' sx={{ display: 'block', ml: 'auto', mr: 'auto', mt: 2 }} onClick={SelectSchedule[select]}>tocame</Button>
                ) : (
                  <Button variant='outlined' sx={{ display: 'block', ml: 'auto', mr: 'auto', mt: 2 }} disabled>tocame</Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Reports
