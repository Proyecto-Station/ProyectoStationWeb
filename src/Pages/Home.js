import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SignInError from '../Components/Auth/SignInError'
import AuthService from '../Services/Api/Auth.Service'

import { Box, Button, Grid, TextField, Typography, Paper, createTheme, ThemeProvider  } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { useField } from '../Hooks/useField'
import { useUser } from '../Hooks/useUser'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: "url(https://www.infodebuses.cl/wp-content/uploads/2017/05/buses-bio-bio-1.jpg)",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 500,
        }
      }
    }
  }
})

const style = {
  paperCss: {
    p: 5,
    border: '2px black solid',
    borderRadius: 5
  },
  boxFormCss: {
    display: 'block',
    ml: 'auto',
    mr: 'auto',
    width: 180
  },
  buttonFormCss: {
    display: 'block',
    mt: 2,
    ml: 'auto',
    mr: 'auto'
  }
}

function Home() {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  const login = useUser()

  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('data'))

    if (user) {
      if (typeof user === 'object') {
        try {
          AuthService.checkUser(user.accessToken).then((res) => {
            return res.data
          })

          return navigate('/schedule')
        } catch (err) {
          return navigate('/')
        }
      } else {
        return navigate('/')
      }
    } else {
      return navigate('/')
    }
  }

  const onLoginIn = (e) => {
    e.preventDefault()
    setOpen(false)

    if (username.value === '') {
      setMessage('Rellene los campos necesarios.')
      return setOpen(true)
    }

    if (password.value === '') {
      setMessage('Rellene los campos necesarios.')
      return setOpen(true)
    }

    return login.loginIn(username.value, password.value).then((res) => {
      const perms = res.userData.permission

      if (perms === 0) {
        localStorage.removeItem('data')
        setMessage('Solo acceso a Clientes y Administradores.')
        return setOpen(true)
      } else {
        return navigate('/schedule')
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { open && (
        <SignInError open={open} message={message} type='error' handleChangeClose={ () => setOpen(false) } />
      )}

      <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ mt: 20 }}>
        <Paper sx={ style.paperCss }>
          <Typography variant='h5' sx={{ textAlign: 'center' }} > Acceso Cliente </Typography>
          <Box component='hr' width={250} />
          <Box component='form' noValidate autoComplete='off' onSubmit={onLoginIn}
            sx={ style.boxFormCss }
          >
            <Box component='div'>
              <TextField
                label='Usuario:'
                helperText='Nunca revele su usuario'
                variant='standard'
                required
                {...username}
              />
            </Box>
            <Box component='div'>
              <TextField
                label='Contraseña:'
                helperText='Nunca revele su contraseña'
                variant='standard'
                required
                {...password}
              />
            </Box>
            <Box component='div'>
              <Button
                type='submit'
                variant='outlined'
                sx={ style.buttonFormCss }
              >
                Iniciar Sesion
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </ThemeProvider>
  )
}

export default Home
