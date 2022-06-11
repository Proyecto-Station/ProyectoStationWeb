import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Schedule = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('data')) {
      navigate('/')
      window.location.reload()
    }
  })

  return <h1>Schedule</h1>
}

export default Schedule
