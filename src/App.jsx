import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggelable'
import CreationForm from './components/CreationForm'
import { useQuery } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import UserPage from './components/UserPage'
import User from './components/User'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'

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

  if (blogQ.isLoading && user) {
    return <div>Loading...</div>
  }
  const blogs = blogQ.data

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const HomePage = () => {
    return (
      <div>
        <Toggleable buttonLabel="add blog">
          <CreationForm setErrorMessage={setErrorMessage} />
        </Toggleable>
        {blogs?.sort(byLikes).map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <Blog key={blog.id} blog={blog} blogs={blogs} />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <Router>
      <div className=" mx-7 my-4 ">
        <NavBar user={user} setUser={setUser} />
        {errorMessage}
        {user === '' ? (
          <Routes>
            <Route
              path="/login"
              element={
                <LoginForm
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword}
                  setErrorMessage={setErrorMessage}
                  setUser={setUser}
                />
              }
            />
          </Routes>
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
