import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setErrorMessage,
  setUser,
}) => {
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.Token)
      navigate('/')
    } catch (err) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      username:{' '}
      <input
        className="input"
        value={username}
        type="text"
        onChange={({ target }) => setUsername(target.value)}
      />{' '}
      <br />
      password:{' '}
      <input
        className="input"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />{' '}
      <br />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
