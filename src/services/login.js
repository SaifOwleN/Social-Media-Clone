import axios from 'axios'
const loginURL =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3003/api/login'
    : 'https://blogsite-api-uvky.onrender.com/api/login'
const userUrl =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3003/api/user'
    : 'https://blogsite-api-uvky.onrender.com/api/user'

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
