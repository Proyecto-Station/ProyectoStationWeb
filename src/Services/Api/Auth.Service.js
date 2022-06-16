import axios from 'axios'

const login = async (username, password) => {
  return axios.post('auth/login', { username, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem('data', JSON.stringify(res.data))
    }

    return res.data
  })
}

const checkUser = async (token) => {
  return axios.post('auth/check', { token }).then((res) => {
    return res.data
  })
}

const AuthService = {
  login,
  checkUser
}

export default AuthService
