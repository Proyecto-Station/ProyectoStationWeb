import { Component } from 'react'
import { withRouter } from 'react-router-dom'

const parseJwt = (accessToken) => {
  try {
    return JSON.parse(atob(accessToken.split('.')[1]))
  } catch (e) {
    return null
  }
}

class AuthVerify extends Component {
  constructor(props) {
    super(props)

    props.history.listen(() => {
      const user = JSON.parse(localStorage.getItem('accessToken'))

      if (user) {
        const decodeJwt = parseJwt(user.accessToken)

        if (decodeJwt.exp * 1000 < Date.now()) {
          props.logOut()
        }
      }
    })
  }
}

export default withRouter(AuthVerify)