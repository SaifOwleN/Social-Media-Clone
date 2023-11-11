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
    <div className="flex justify-center items-center h-[90%]  ">
      <div className="flex p-16 rounded-2xl shadow-2xl bg-black justify-center">
        <h2 className="text-xl font-inter">Sign In</h2>
        <div className="flex">
          <form onSubmit={handleLogin} className="w-4/12" autoComplete="off">
            <input
              className="input input-primary login"
              value={username}
              placeholder="username"
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />{' '}
            <br />
            <input
              className="input input-primary login"
              name="passwordlogin"
              placeholder="Password"
              type="password"
              value={password}
              autoComplete="off"
              onChange={({ target }) => setPassword(target.value)}
            />{' '}
            <br />
            <div className="form-control w-full">
              <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input
                  type="checkbox"
                  value={check}
                  onChange={() => setCheck(!check)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
