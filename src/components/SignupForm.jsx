import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
const Signup = ({ setUser }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    const user = await loginService.signup({ username, name, password })
    setUser(user)
    setName('')
    setUsername('')
    setPassword('')
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.Token)
    navigate('/')
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      navigate('/')
    }
  }, [])

  return (
    <form onSubmit={handleSignup}>
      <label className="label label-text">Name</label>
      <input
        className="input input-secondary"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <label className="label label-text">username</label>

      <input
        className="input input-secondary"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <label className="label label-text">password</label>
      <input
        className="input input-secondary"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button type="submit" className="btn btn-accent">
        signup
      </button>
    </form>
  )
}

export default Signup
