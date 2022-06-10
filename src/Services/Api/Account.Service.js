import axios from 'axios'
import authHeader from '../Middleware/Auth.Header'

const getDetailsAccount = () => {
  const user = JSON.parse(localStorage.getItem('userData'))

  return axios.get('user/' + user.id, { headers: authHeader() })
}

const accountService = {
  getDetailsAccount
}

export default accountService