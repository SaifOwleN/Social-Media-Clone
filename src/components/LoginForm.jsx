import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState } from 'react'

const LoginForm = ({ setErrorMessage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      if (check) {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
      }
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
    <div className="flex justify-center ">
      <form onSubmit={handleLogin} className="w-4/12" autoComplete="off">
        username:{' '}
        <input
          className="input input-primary login"
          value={username}
          type="text"
          onChange={({ target }) => setUsername(target.value)}
        />{' '}
        <br />
        password:{' '}
        <input
          className="input input-primary login"
          name="passwordlogin"
          type="password"
          value={password}
          autoComplete="off"
          onChange={({ target }) => setPassword(target.value)}
        />{' '}
        <br />
        <label className="cursor-pointer label">
          <span className="label-text">Remember me</span>
          <input
            type="checkbox"
            value={check}
            onChange={() => setCheck(!check)}
            className="toggle toggle-primary"
          />
        </label>{' '}
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
