import React from 'react'
import { useNavigate } from 'react-router-dom'

export const withNavigate = (Component) => {
  const ComponentWithRouter = (props) => {
    const navigate = useNavigate()

    return <Component {...props} navigate={navigate} />
  }

  return ComponentWithRouter
}
