import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import AuthService from './Services/Auth/Auth.Service'
import EventBus from './Services/Common/EventBus'

import Home from './Components/Home'
import Schedule from './Components/Schedule'

const App = () => {
  const [showAdminMenu, setShowAdminMenu] = useState(true)
  const [showClientMenu, setShowClientMenu] = useState(true)
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
            <Link to='/'>Home</Link>
          </li>

          <li>
            <Link to='schedule'>schedule</Link>
          </li>
        </nav>
      </div>

      <div>
        <Routes basename='/'>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/schedule' element={<Schedule />} />
          <Route path='*' element={<h1>Page not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
