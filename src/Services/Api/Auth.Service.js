import axios from 'axios'

class AuthService {
  async login(username, password) {
    return await axios
      .post('auth/login', { username, password })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem('data', JSON.stringify(res.data))
        }

        return res.data
      })
  }

  logout() {
    localStorage.removeItem('data')
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('data'))
  }
}

export default new AuthService()
