import axios from 'axios'

const login = async (username, password) => {
  return await axios
    .post('auth/login', {
      username,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem('data', JSON.stringify(res.data))
      }

      return res.data
    })
}

const logout = () => {
  localStorage.removeItem('data')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

const AuthService = {
  login,
  logout,
  getCurrentUser,
}

export default AuthService
