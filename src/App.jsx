import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import UserPage from './components/UserPage'
import User from './components/User'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import Signup from './components/SignupForm'
import HomePage from './components/HomePage'
import SignInHome from './components/SingInHome'

const App = () => {
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.Token)
    }
  }, [])

  const blogQ = useQuery({
    queryKey: ['blogs', user],
    queryFn: blogService.getAll,
    enabled: !!user,
    refetchOnWindowFocus: false,
  })
  if (blogQ.isLoading && user) {
    return <div>Loading...</div>
  }
  const blogs = blogQ.data

  const changeError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  return (
    <Router>
      <div className="bg-black h-full">
        <NavBar user={user} setUser={setUser} />
        {errorMessage ? (
          <div className="toast m-5">
            <div className="alert alert-success">
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errorMessage}
            </div>
          </div>
        ) : (
          ''
        )}
        {user === '' ? (
          <Routes>
            <Route path="/" element={<SignInHome />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  setErrorMessage={setErrorMessage}
                  setUser={setUser}
                />
              }
            />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        ) : (
          <div>
            <Routes>
              <Route
                path="/"
                element={<HomePage blogs={blogs} changeError={changeError} />}
              />
              <Route path="/users" element={<UserPage />} />
              <Route
                path="/users/:id"
                element={<User user={user} changeError={changeError} />}
              />
              <Route
                path="/blogs/:id"
                element={<BlogPage user={user} setError={changeError} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
