import axios from 'axios'
const loginURL = 'https://blogSite-api.onrender.com/api/login'
const userUrl = 'https://blogSite-api.onrender.com/api/users'

const login = async (cred) => {
  const req = await axios.post(loginURL, cred).then((re) => re.data)
  console.log('req', req)
  return req
}

const signup = async (cred) => {
  const res = await axios.post(userUrl, cred).then((res) => res.data)
  console.log('res', res)
  return res
}

export default { login, signup }
