import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useState } from 'react'
import {
  AiOutlineCi,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
const LoginForm = ({ setErrorMessage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [check, setCheck] = useState(false)
  const [shown, setShown] = useState(false)
  const navigate = useNavigate()
  const showPassword = shown ? 'text' : 'password'

  const userQ = useQuery({
    queryKey: ['user'],
    queryFn: () => loginService.login({ username, password }),
    enabled: false,
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    await userQ.refetch()
    if (userQ.isSuccess) {
      const user = userQ.data
      setUser(userQ.data)
      console.log('user', userQ)
      setUsername('')
      setPassword('')
      if (check) {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
      }
      blogService.setToken(user.Token)
      navigate('/')
    } else {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="p-16 rounded-2xl shadow-2xl bg-black">
        <h2 className="text-3xl font-inter pb-6">Sign In</h2>
        <div className="flex w-96">
          <form onSubmit={handleLogin} autoComplete="off">
            <input
              className="input input-primary login"
              value={username}
              placeholder="username"
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            <label className="relative block">
              <input
                className="input input-primary w-full login"
                name="passwordlogin"
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
            <div className="form-control w-96 my-4">
              <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input
                  type="checkbox"
                  value={check}
                  onChange={() => setCheck(!check)}
                  className="toggle toggle-accent"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-96 mt-2">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
