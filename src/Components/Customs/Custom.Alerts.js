import React, { Component } from 'react'
import { Alert } from '@mui/material'

class CustomAlerts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.type,
      message: this.props.msg,
    }
  }

  render() {
    const { type, message } = this.state

    return (
      <React.Fragment>
        <Alert severity={type}>{message}</Alert>
      </React.Fragment>
    )
  }
}

export default CustomAlerts
