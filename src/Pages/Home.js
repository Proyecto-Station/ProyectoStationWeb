import React, { useState } from 'react'

import SignInError from '../Components/Auth/SignInError'

import { Box, Button, Grid, TextField, Typography } from '@mui/material'

import { useField } from '../Hooks/useField'
import { useUser } from '../Hooks/useUser'

function Home() {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  const login = useUser()

  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

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

    return login.loginIn(username.value, password.value).catch((err) => console.log('error ctm'))
  }

  return (
    <>
      { open && (
        <SignInError open={open} message={message} type='error' handleChangeClose={ () => setOpen(false) } />
      )}

      <Grid container direction='column' justifyContent='center' alignItems='center' >
        <Typography variant='h5' sx={{mt: 5}}> Login Station </Typography>
        <Box component='hr' width={250} />
        <Box component='form' noValidate autoComplete='off' onSubmit={onLoginIn} >
          <div>
            <TextField
              label='Usuario:'
              helperText='Nunca revele su usuario'
              variant='standard'
              required
              {...username}
            />
          </div>
          <div>
            <TextField
              label='Contraseña:'
              helperText='Nunca revele su usuario'
              variant='standard'
              required
              {...password}
            />
          </div>
          <div>
            <Button
              type='submit'
              variant='outlined'
              sx={{
                display: 'block',
                mt: 2,
                ml: 'auto',
                mr: 'auto'
              }}
            >
              Login In
            </Button>
          </div>
        </Box>
      </Grid>
    </>
  )
}

export default Home
