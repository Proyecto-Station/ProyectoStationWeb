import { useNavigate } from 'react-router-dom'
import AuthService from '../Services/Api/Auth.Service'

export function useUser() {

  const navigate = useNavigate()

  const loginIn = (username, password) => {
    return AuthService.login(username, password).then((res) => {
      navigate('/schedule')
      return res.data
    })
  }

  const logOut = () => {
    localStorage.removeItem('data')
    navigate('/')
  }

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('data'))

    if (user) {
      if (typeof user === 'object') {
        try {
          return AuthService.checkUser(user.accessToken)
        } catch (err) {
          return navigate('/')
        }
      } else {
        return navigate('/')
      }
    } else {
      return navigate('/')
    }
  }

  return {
    loginIn,
    logOut,
    getUser
  }
}
