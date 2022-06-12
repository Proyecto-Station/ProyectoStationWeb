import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthService from '../Services/Api/Auth.Service'

import SignInForm from './Auth/SignInForm'
import SignInError from './Auth/SignInError'

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
      setOpen(true)
      setType('error')
      setLoginInError(true)
      setMessage('Rellene los campos necesarios.')
      return
    }

    if (password === '') {
      setOpen(true)
      setType('error')
      setLoginInError(true)
      setMessage('Rellene los campos necesarios.')
      return
    }

    AuthService.login(username, password).then((res) => {
      const active = res.userData.is_active

      if (active) {
        navigate('/schedule')
        window.location.reload()
      }
    }, () => {
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

      <div>
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
      </div>
    </>
  )
}

export default Home
