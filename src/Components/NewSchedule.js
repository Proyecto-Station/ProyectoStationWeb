import React, { Component } from 'react'
import ScheduleService from '../Services/Api/Schedule.Service'

import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material'

class NewSchedule extends Component {
  constructor(props) {
    super(props)

    this.onChangeCheckIn = this.onChangeCheckIn.bind(this)
    this.onChangeCheckOut = this.onChangeCheckOut.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeRoute = this.onChangeRoute.bind(this)
    this.onChangePlatform = this.onChangePlatform.bind(this)
    this.onChangeCost = this.onChangeCost.bind(this)

    this.onClickInsert = this.onClickInsert.bind(this)

    this.state = {
      checkInData: null,
      checkOutData: null,
      dateData: null,
      routeData: '',
      platformData: null,
      costData: null,

      comboFill: [],
    }
  }

  /**
   * * Rellenar Select cuando carge la pagina
   */
  componentDidMount() {
    this.onFillComboBox()
  }

  /**
   * * Funcion para rellenar data del comboBox
   */
  onFillComboBox() {
    ScheduleService.getDetailsRoute().then((res) => {
      const data = res.data

      this.setState({
        comboFill: data,
      })
    })
  }

  /**
   * * Funciones de onChange()
   */
  onChangeCheckIn(e) {
    e.preventDefault()

    this.setState({
      checkInData: e.target.value,
    })
  }

  onChangeCheckOut(e) {
    e.preventDefault()

    this.setState({
      checkOutData: e.target.value,
    })
  }

  onChangeDate(e) {
    e.preventDefault()

    this.setState({
      dateData: e.target.value,
    })
  }

  onChangeRoute(e) {
    e.preventDefault()

    this.setState({
      routeData: e.target.value,
    })
  }

  onChangePlatform(e) {
    e.preventDefault()

    this.setState({
      platformData: e.target.value,
    })
  }

  onChangeCost(e) {
    e.preventDefault()

    this.setState({
      costData: e.target.value,
    })
  }

  /**
   * * Funcion onClick
   */

  onClickInsert(e) {
    e.preventDefault()

    this.handleInsertSchedule()
  }

  /**
   * * Funcion http Insert
   */

  handleInsertSchedule() {
    const data = {
      check_in: this.state.checkInData,
      check_out: this.state.checkOutData,
      date: this.state.dateData,
      route_id: this.state.routeData,
      platform: this.state.platformData,
      cost: this.state.costData,
    }

    ScheduleService.insertSchedule(
      data.check_in,
      data.check_out,
      data.date,
      data.route_id,
      data.platform,
      data.cost
    ).then(() => {
      this.props.navigate.push('/schedule')
      window.location.reload()
    })
  }

  render() {
    const { comboFill } = this.state
    return (
      <React.Fragment>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ mt: '8%' }}
        >
          <Paper sx={{ width: '15rem', borderRadius: '10px' }}>
            <Box>
              <Typography variant='h5' align='center'>
                Register New Schedule
              </Typography>
            </Box>

            <Box>
              <TextField
                label='Check In'
                helperText='Select an hour Check In'
                variant='standard'
                type='time'
                onChange={this.onChangeCheckIn}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>

            <Box>
              <TextField
                label='Check Out'
                helperText='Select an hour Check Out'
                variant='standard'
                type='time'
                onChange={this.onChangeCheckOut}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>

            <Box>
              <TextField
                label='Date'
                helperText='Select an date'
                variant='standard'
                type='date'
                onChange={this.onChangeDate}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>

            <Box>
              <TextField
                label='Route'
                helperText='Select an route'
                variant='standard'
                select
                value={this.state.routeData}
                onChange={this.onChangeRoute}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                required
              >
                {comboFill.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.origen} - {item.destination}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box>
              <TextField
                label='Platform'
                helperText='Write ID Platform'
                variant='standard'
                onChange={this.onChangePlatform}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                required
              />
            </Box>

            <Box>
              <TextField
                label='Cost'
                helperText='Write Cost'
                variant='standard'
                type='number'
                onChange={this.onChangeCost}
                sx={{
                  mt: '5%',
                  mr: '10%',
                  ml: '10%',
                  width: 200,
                }}
                required
              />
            </Box>

            <Box>
              <Button
                variant='outlined'
                color='info'
                onClick={this.onClickInsert}
                sx={{
                  mt: '5%',
                  mb: '10%',
                  mr: '10%',
                  ml: '10%',
                }}
              >
                Create Schedule
              </Button>
            </Box>
          </Paper>
        </Grid>
      </React.Fragment>
    )
  }
}

export default NewSchedule
