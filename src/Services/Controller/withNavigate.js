import React from 'react'
import { useHistory } from 'react-router-dom'

export const withNavigate = (Component) => {
  const ComponentWithRouter = (props) => {
    const navigate = useHistory()

    return <Component {...props} navigate={navigate} />
  }

  return ComponentWithRouter
}

  
