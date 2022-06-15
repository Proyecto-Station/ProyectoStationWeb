import axios from 'axios'

const login = (username, password) => {
  return axios.post('auth/login', { username, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem('data', JSON.stringify(res.data))
    }

    return res.data
  })
}

const AuthService = {
  login
}

export default AuthService
