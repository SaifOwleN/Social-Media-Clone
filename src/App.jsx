import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggelable'
import CreationForm from './components/CreationForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import UserPage from './components/UserPage'
import User from './components/User'
import BlogPage from './components/BlogPage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (blogQ.isLoading) {
    return <div>Loading...</div>
  }
  const blogs = blogQ.data

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.Token)
    } catch (err) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser('')
  }

  const handleCreation = async (blogToAdd) => {
    setErrorMessage(`a new blog has been added: ${blogToAdd.author}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        username:{' '}
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />{' '}
        <br />
        password:
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />{' '}
        <br />
        <button type="submit">login</button>
      </form>
    )
  }
  const HomePage = () => {
    return (
      <>
        <Toggleable buttonLabel="add blog">
          <CreationForm />
        </Toggleable>
        {blogs?.sort(byLikes).map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <Blog key={blog.id} blog={blog} blogs={blogs} />
          </Link>
        ))}
      </>
    )
  }

  return (
    <Router>
      <div>
        <NavBar user={user} handleLogout={handleLogout} />
        <h2>blogs</h2>
        {errorMessage}

        {user === '' ? (
          loginForm()
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogPage user={user} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
