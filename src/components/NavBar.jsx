import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const padding = {
    paddingRight: 5,
  }
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser('')
    navigate('/login')
  }

  const SignedIn = () => {
    return (
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full w-10">
              <img src="/Seif.jpg" />
            </div>
          </label>
          <ul className="p-2 bg-base-100 menu rounded-box dropdown-content">
            <li>
              <Link to={`/users/${user.id}`}>
                {' '}
                <button>Profile</button>
              </Link>
              <button onClick={handleLogout}>logout</button>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    )
  }

  const SignedOut = () => {
    return (
      <div className="flex-none">
        <Link to={'/login'} className="btn shadow">
          sign in
        </Link>
        <Link to={'/signup'} className="btn shadow">
          sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="navbar bg-black">
      <div className="flex-1 ">
        <h2 className="text-blue-600 font-inter text-2xl" style={padding}>
          blogs
        </h2>

        <Link to={'/'} style={padding}>
          Home
        </Link>
        <Link to={'/users'} style={padding}>
          Users
        </Link>
      </div>
      {user ? <SignedIn /> : <SignedOut />}
    </div>
  )
}

export default NavBar
