import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
const Signup = ({ setUser }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [shown, setShown] = useState(false)
  const showPassword = shown ? 'text' : 'password'

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
    <div className="flex justify-center items-center h-[92%]">
      <div className="bg-black shadow-2xl p-16 rounded-xl">
        <h2 className="text-3xl font-inter pb-7">Sign Up</h2>
        <div className="flex">
          <form onSubmit={handleSignup} className="flex items-center flex-col">
            <input
              className="input input-primary border-b-2"
              value={name}
              placeholder="Name"
              onChange={({ target }) => setName(target.value)}
            />
            <input
              className="input input-primary"
              value={username}
              placeholder="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <label className="relative block">
              <input
                className="input input-primary w-full "
                name="password"
                placeholder="Password"
                type={showPassword}
                value={password}
                autoComplete="off"
                onChange={({ target }) => setPassword(target.value)}
              />
              <button
                value={shown}
                onClick={() => setShown(!shown)}
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {!shown ? (
                  <AiOutlineEye className="text-lg" />
                ) : (
                  <AiOutlineEyeInvisible className="text-lg" />
                )}
              </button>
            </label>
            <br />
            <button type="submit" className="btn btn-primary w-96">
              signup
            </button>
          </form>
          <img src="Tux.svg.png" className="ml-32 h-64" />
        </div>
      </div>
    </div>
  )
}

export default Signup
