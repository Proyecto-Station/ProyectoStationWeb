import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import AuthService from './Services/Auth/Auth.Service'
import EventBus from './Services/Common/EventBus'

import Home from './Components/Home'

const App = () => {
  const [showAdminMenu, setShowAdminMenu] = useState(0)
  const [showClientMenu, setShowClientMenu] = useState(0)
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowClientMenu(user)
      setShowAdminMenu(user)
    }

    EventBus.on('logout', () => {
      logOut()
    })

    return () => {
      EventBus.remove('logout')
    }
  }, [])

  const logOut = () => {
    AuthService.logout()

    setCurrentUser(undefined)
    setShowClientMenu(0)
    setShowAdminMenu(0)
  }

  return (
    <>
      <div>
        <nav>
          <li>
            <Link to={'/'}>Home</Link>
          </li>

          {setShowClientMenu && (
            <li>
              <Link to={'/schedule'}>schedule</Link>
            </li>
          )}

          {setShowAdminMenu && (
            <li>
              <Link to={'/newuser'}>new user</Link>
            </li>
          )}
        </nav>
      </div>

      <div>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
