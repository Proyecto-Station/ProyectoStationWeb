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
  }

  const getUser = () => {
    const user = localStorage.getItem('data')
  }

  return {
    loginIn,
    logOut,
    getUser
  }
}
