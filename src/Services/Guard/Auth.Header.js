export default function AuthHeader() {
  const data = JSON.parse(localStorage.getItem('data'))

  if (data && data.accessToken) {
    return {
      Authorization: 'Bearer ' + data.accessToken,
      'Content-Type': 'application/json',
    }
  } else {
    return {}
  }
}
