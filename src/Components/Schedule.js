import React, { Component } from 'react'

import {
  IconButton,
  Modal,
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'

import ScheduleService from '../Services/Api/Schedule.Service'
import { withNavigate } from '../Services/Controller/withNavigate'

import { Style } from '../Themes/Theme.Private'

class Schedule extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.onClickEditModal = this.onClickEditModal.bind(this)
    this.onClickDeleteModal = this.onClickDeleteModal.bind(this)

    this.handleEditId = this.handleEditId.bind(this)
    this.handleEditCheckIn = this.handleEditCheckIn.bind(this)
    this.handleEditCheckOut = this.handleEditCheckOut.bind(this)
    this.handleEditDate = this.handleEditDate.bind(this)
    this.handleEditPlatform = this.handleEditPlatform.bind(this)
    this.handleEditCost = this.handleEditCost.bind(this)

    this.state = {
      redirect: null,
      loading: true,
      open: false,
      currentData: [],
      column: [
        {
          field: 'id',
          headerName: '#',
          align: 'center',
          headerAlign: 'center',
          width: 90,
        },
        {
          field: 'check_in',
          headerName: 'Check In',
          align: 'center',
          headerAlign: 'center',
          width: 100,
          valueGetter: (params) => `${params.row.check_in.slice(0, 5)}`,
        },
        {
          field: 'check_out',
          headerName: 'Check Out',
          align: 'center',
          headerAlign: 'center',
          width: 100,
          valueGetter: (params) => `${params.row.check_out.slice(0, 5)}`,
        },
        {
          field: 'date',
          headerName: 'Date',
          align: 'center',
          headerAlign: 'center',
          width: 120,
          valueGetter: (params) =>
            `${params.row.date.slice(8, 10)}${params.row.date.slice(
              4,
              8
            )}${params.row.date.slice(0, 4)}`,
        },
        {
          field: 'origen',
          headerName: 'Origen',
          align: 'center',
          headerAlign: 'center',
          width: 200,
        },
        {
          field: 'destination',
          headerName: 'Destination',
          align: 'center',
          headerAlign: 'center',
          width: 200,
        },
        {
          field: 'platform',
          headerName: 'Platform',
          align: 'center',
          headerAlign: 'center',
          width: 100,
        },
        {
          field: 'company_name',
          headerName: 'Company',
          align: 'center',
          headerAlign: 'center',
          width: 100,
        },
        {
          field: 'cost',
          headerName: 'Cost',
          align: 'center',
          headerAlign: 'center',
          width: 100,
          valueGetter: (params) => `$${params.row.cost}`,
        },
        {
          field: 'action',
          headerName: 'Action',
          disableClickEventBubbling: true,
          align: 'center',
          sortable: false,
          headerAlign: 'center',
          width: 200,
          renderCell: (params) => (
            <>
              <IconButton
                variant='contained'
                color='secondary'
                onClick={() => {
                  this.callRefill(params.id)
                }}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                variant='contained'
                color='warning'
                sx={{ ml: '20px', mr: '20px' }}
                onClick={() => {
                  this.onEditModal(params.id)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                variant='contained'
                color='error'
                onClick={(event) => this.onClickDeleteModal(event, params.id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ),
        },
      ],
      row: [],
      tempData: null,
      editData: null,
      tempEditData: null,
      comboFill: [],
      check: false,
      openEdit: false,
      tempId: null,

      idEdit: null,
      check_inEdit: null,
      check_outEdit: null,
      dateEdit: null,
      fillCombo: null,
      platformEdit: null,
      costEdit: null,
    }
  }

  /**
   * * On Clicks
   */
  onClickEditModal(e) {
    e.preventDefault()

    const data = {
      id: this.state.idEdit,
      check_in: this.state.check_inEdit,
      check_out: this.state.check_outEdit,
      date: this.state.dateEdit.slice(0, 10),
      route_id: this.state.fillCombo,
      platform: this.state.platformEdit,
      cost: this.state.costEdit,
    }

    ScheduleService.patchDetailsSchedule(
      data.id,
      data.check_in,
      data.check_out,
      data.date,
      data.route_id,
      data.platform,
      data.cost
    ).then(() => {
      this.handleCloseEdit()
      this.handleLoad()
    })
  }

  onClickDeleteModal(e, params) {
    e.preventDefault()

    const data = {
      id: params,
    }

    ScheduleService.deleteSchedule(data.id).then(() => {
      this.handleLoad()
    })
  }

  onClickNew(e) {
    e.preventDefault()
  }

  /**
   * * Handle Changes
   */
  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleOpenEdit = () => {
    this.setState({
      openEdit: true,
    })
  }

  handleCloseEdit = () => {
    this.setState({
      openEdit: false,
      check: true,
      tempEditData: null,
    })
  }

  async handleChange(event) {
    this.setState({
      fillCombo: event.target.value,
    })
  }

  componentDidMount() {
    this.handleLoad()
    this.onRefillComboBox()
  }

  handleLoad() {
    ScheduleService.getAllSchedule().then((res) => {
      const data = res.data.data

      this.setState({
        currentData: data,
        loading: false,
      })
    })
  }

  onViewModal(id) {
    ScheduleService.getDetailsSchedule(id).then((res) => {
      const data = res.data

      this.setState({
        tempData: data,
      })
    })
  }

  onViewEditModal(id) {
    ScheduleService.getDetailsEditSchedule(id).then((res) => {
      const data = res.data

      this.setState({
        tempEditData: data,
        idEdit: data.id,
        check_inEdit: data.check_in,
        check_outEdit: data.check_out,
        dateEdit: data.date,
        fillCombo: data.route_id,
        platformEdit: data.platform,
        costEdit: data.cost,
      })
    })
  }

  onEditModal(id) {
    this.onViewEditModal(id)
    this.handleOpenEdit()
  }

  async onRefillComboBox() {
    await ScheduleService.getDetailsRoute().then((res) => {
      const data = res.data

      this.setState({
        comboFill: data,
      })
    })
  }

  callRefill(id) {
    this.onViewModal(id)
    this.handleOpen()
  }

  handleEditId(e) {
    e.preventDefault()

    this.setState({
      idEdit: e.target.value,
    })
  }

  handleEditCheckIn(e) {
    e.preventDefault()

    this.setState({
      check_inEdit: e.target.value,
    })
  }

  handleEditCheckOut(e) {
    e.preventDefault()

    this.setState({
      check_outEdit: e.target.value,
    })
  }

  handleEditDate(e) {
    e.preventDefault()

    this.setState({
      dateEdit: e.target.value,
    })
  }

  handleEditPlatform(e) {
    e.preventDefault()

    this.setState({
      platformEdit: e.target.value,
    })
  }

  handleEditCost(e) {
    e.preventDefault()

    this.setState({
      costEdit: e.target.value,
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loadingDiv'>Calling the API, one moment please!</div>
      )
    }

    const { currentData, tempData, tempEditData, comboFill } = this.state

    return (
      <React.Fragment>
        <>
          <Button sx={{ mt: '8%' }}>New Schedule</Button>
        </>

        <>
          <DataGrid
            columns={this.state.column}
            rows={currentData}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{ height: '400px', width: '100%' }}
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }],
              },
            }}
          />
        </>

        {tempData && (
          <Modal open={this.state.open} onClose={this.handleClose}>
            <Box sx={Style.boxModel}>
              <Typography variant='h6'>
                Details Route {tempData.origen} - {tempData.destination}
              </Typography>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
                  <Typography>Check In:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.check_in}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Check Out:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.check_out}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Date:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.date.slice(0, 10)}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Origen:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.origen}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Destination:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.destination}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Platform:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.platform}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Cost:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>${tempData.cost}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Company:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{tempData.company_name}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Routes:</Typography>
                </Grid>
                <Grid item xs={8}>
                  {tempData.stops.map((p) => (
                    <Typography key={p.route}>{p.route}</Typography>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}

        {tempEditData && comboFill && (
          <Modal open={this.state.openEdit} onClose={this.handleCloseEdit}>
            <Box sx={Style.boxModel}>
              <Typography variant='h6'>Edit</Typography>

              <Grid container spacing={2} columns={16}>
                <Grid item xs={6}>
                  <Typography>Check In:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='standard'
                    label='Check In'
                    type='time'
                    sx={{ width: 200 }}
                    value={this.state.check_inEdit.slice(0, 5)}
                    onChange={this.handleEditCheckIn}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography>Check Out:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='standard'
                    label='Check Out'
                    type='time'
                    sx={{ width: 200 }}
                    value={this.state.check_outEdit.slice(0, 5)}
                    onChange={this.handleEditCheckOut}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography>Date:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='standard'
                    label='Date'
                    type='date'
                    sx={{ width: 200 }}
                    value={this.state.dateEdit.slice(0, 10)}
                    onChange={this.handleEditDate}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography>Route:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    select
                    label='Route'
                    value={this.state.fillCombo}
                    onChange={this.handleChange}
                    variant='standard'
                    sx={{ width: 200 }}
                    required
                  >
                    {comboFill.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.origen} - {item.destination}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Platform:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='standard'
                    label='Platform'
                    type='text'
                    sx={{ width: 200 }}
                    value={this.state.platformEdit}
                    onChange={this.handleEditPlatform}
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography>Cost:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    variant='standard'
                    label='Cost'
                    type='text'
                    sx={{ width: 200 }}
                    value={this.state.costEdit}
                    onChange={this.handleEditCost}
                    required
                  />
                </Grid>

                <Grid item xs={16}>
                  <Button onClick={this.onClickEditModal}>Edit</Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
      </React.Fragment>
    )
  }
}

export default withNavigate(Schedule)
