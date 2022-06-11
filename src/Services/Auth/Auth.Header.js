const AuthHeader = () => {
  const data = JSON.parse(localStorage.getItem('data'))

  if (data && data.accessToken) {
    return {
      Authorization: 'Bearer ' + data.accessToken
    }
  } else {
    return {}
  }
}

export default AuthHeader
