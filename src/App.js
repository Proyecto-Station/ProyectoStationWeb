import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Components/Home'
import Schedule from './Components/Schedule'
import Reports from './Components/Reports'

import NavBarMenu from './Components/Utils/NavBarMenu'

function App() {
  return (
    <>
      <NavBarMenu />

      <div>
        <Routes basename='/'>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/schedule' element={<Schedule />} />
          <Route exact path='/report' element={<Reports />} />
          <Route path='*' element={<h1>Page not Found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
