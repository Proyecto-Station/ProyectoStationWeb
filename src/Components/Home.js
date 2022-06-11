import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../Services/Api/Auth.Service'

import { Box, Grid, InputAdornment, Paper, TextField, Typography, Button } from '@mui/material'
import { Lock, AccountCircle } from '@mui/icons-material'

import LayoutAlert from './Layout/Layout.Alert'

const Home = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('data')) {
      navigate('/schedule')
      window.location.reload()
    }
  })

  /**
   * * Funcion Flechas onChange
   */
  const onChangeUsername = (e) => {
    const username = e.target.value
    setUsername(username)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  /**
   * * Funcion Flecha onClick
   */
  const onClickLogin = (e) => {
    e.preventDefault()
    setLoading(false)

    AuthService.login(username, password).then((res) => {
      const active = res.userData.is_active

      if (active) {
        navigate('/schedule')
        window.location.reload()
      }
    }, () => {
      setLoading(true)
    })
  }

  return (
    <>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Paper>
          <Box>
            <Typography>Login</Typography>
          </Box>

          {loading && (
            <Box>
              <LayoutAlert type='error' msg='Invalid credentials' />
            </Box>
          )}

          <Box>
            <TextField
              label='Username'
              helperText='Nunca compartir tu nombre de usuario.'
              variant='standard'
              required
              value={username}
              onChange={onChangeUsername}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              label='Password'
              helperText='Nunca compartir tu nombre de contraseña.'
              variant='standard'
              required
              value={password}
              onChange={onChangePassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Button onClick={onClickLogin}>Login In</Button>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

export default Home
