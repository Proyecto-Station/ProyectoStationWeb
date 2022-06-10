import React, { Component } from 'react'

import AuthService from '../../Services/Api/Auth.Service'

import {
  Grid,
  Paper,
  Box,
  InputAdornment,
  Button,
  TextField,
  Typography,
} from '@mui/material'

import { Lock, AccountCircle } from '@mui/icons-material'

import CustomAlerts from '../Customs/Custom.Alerts'
import { Style } from '../../Themes/Theme.SignIn'

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      username: null,
      password: null,
      message: undefined,
      loading: false,
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin(e) {
    e.preventDefault()

    AuthService.login(this.state.username, this.state.password).then(
      () => {
        this.props.navigate('/')
        window.location.reload()
      },
      (err) => {
        const resMessage = err.response.data.message

        this.setState({
          loading: true,
          message: resMessage,
        })
      }
    )
  }

  render() {
    const { message, loading } = this.state

    return (
      <React.Fragment>
        <Grid container justifyContent='center' alignItems='center'>
          <Paper sx={Style.paperWeb}>
            <Box>
              <Typography variant='h5' align='center' sx={Style.titleText}>
                Sign In
              </Typography>
            </Box>
            <Box>
              {loading ? (
                <CustomAlerts type='error' msg={message} />
              ) : (
                <React.Fragment />
              )}

              <TextField
                label='Username'
                helperText="We'll never share your username."
                variant='standard'
                sx={Style.textInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                onChange={this.onChangeUsername}
                required
              />
            </Box>
            <Box>
              <TextField
                label='Password'
                helperText="We'll never share your password."
                type='password'
                variant='standard'
                sx={Style.textInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                onChange={this.onChangePassword}
                required
              />
            </Box>
            <Box>
              <Button
                variant='contained'
                sx={Style.button}
                onClick={this.handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Paper>

          <Paper sx={Style.paperMovil}>
            <Box>
              <Typography variant='h5' align='center' sx={Style.titleText}>
                Sign In
              </Typography>
            </Box>
            <Box>
              {loading ? (
                <CustomAlerts type='error' msg={message} />
              ) : (
                <React.Fragment />
              )}

              <TextField
                label='Username'
                helperText="We'll never share your username."
                variant='standard'
                sx={Style.textInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                onChange={this.onChangeUsername}
                required
              />
            </Box>
            <Box>
              <TextField
                label='Password'
                helperText="We'll never share your password."
                type='password'
                variant='standard'
                sx={Style.textInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                onChange={this.onChangePassword}
                required
              />
            </Box>
            <Box>
              <Button
                variant='contained'
                sx={Style.button}
                onClick={this.handleLogin}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Grid>
      </React.Fragment>
    )
  }
}

export default SignIn
