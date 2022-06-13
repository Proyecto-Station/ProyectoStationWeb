import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../Services/Api/Auth.Service'

import SignInForm from './Auth/SignInForm'
import SignInError from './Auth/SignInError'

import { Box } from '@mui/material'

const Style = {
  diplay: 'block',
  ml: 'auto',
  mr: 'auto',
  mt: '15%',
  width: '300px',
  height: '300px',
  border: '1px solid #000',
  borderRadius: 5,
  background: 'white'
}

function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [loginInError, setLoginInError] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('data')) {
      navigate('/schedule')
      window.location.reload()
    }
  })

  /**
   * * Funcion de Login In
   */
  const onLoginIn = (e) => {
    e.preventDefault()
    setLoginInError(false)

    if (username === '') {
      setType('error')
      setMessage('Rellene los campos necesarios.')
      setOpen(true)
      setLoginInError(true)
      return
    }

    if (password === '') {
      setType('error')
      setMessage('Rellene los campos necesarios.')
      setOpen(true)
      setLoginInError(true)
      return
    }

    AuthService.login(username, password).then((res) => {
      const active = res.userData.is_active

      if (active) {
        navigate('/schedule')
        window.location.reload()
      }
    }, (err) => {
      setType('error')
      setMessage(err.response.data.message)
      setOpen(true)
      setLoginInError(true)
    })
  }

  return (
    <>
      { loginInError && (
        <div>
          <SignInError
            open={open}
            message={message}
            type={type}
            handleChangeClose={ () => setOpen(false) }
          />
        </div>
      )}

      <Box sx={Style}>
        <SignInForm
          username={username}
          password={password}
          handleChangeUsername={
            ({target}) => setUsername(target.value)
          }
          handleChangePassword={
            ({target}) => setPassword(target.value)
          }
          handleSubmit={onLoginIn}
        />
      </Box>
    </>
  )
}

export default Home
