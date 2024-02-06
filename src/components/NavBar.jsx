import { Link, useNavigate } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { AiOutlineUser } from 'react-icons/ai'
import { useState, useEffect } from 'react'
const NavBar = ({ user, setUser }) => {
  const [color, setColor] = useState('')
  const [userC, setUserC] = useState('')

  const navigate = useNavigate()
  const padding = {
    paddingRight: 6,
  }
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    window.sessionStorage.clear()
    setUser('')
    navigate('/login')
  }
  useEffect(() => {
    if (window.location.pathname == '/') {
      setColor(' text-cyan-500')
    } else {
      setColor('')
    }
    if (window.location.pathname == '/users') {
      setUserC(' text-cyan-500')
    } else {
      setUserC('')
    }
  }, [window.location.pathname])

  const SignedIn = () => {
    return (
      <div className="flex-none mr-10">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full w-10">
              <img src={user.img} />
            </div>
          </label>
          <ul className="bg-base-100 menu rounded-box dropdown-content">
            <li>
              <Link to={`/users/${user.id}`} className="pr-10">
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
    <div className="navbar bg-slate-900">
      <div className="flex-1 min-h-full">
        <h2 className={` font-inter text-2xl ml-32`} style={padding}>
          Blog Website
        </h2>

        <Link
          to={'/'}
          className={'flex mx-5 text-lg hover:text-cyan-500 ' + color}
          style={padding}
        >
          <IoHomeOutline className="m-1" />
          Home
        </Link>
        <Link
          to={'/users'}
          className={' flex items-center text-lg hover:text-cyan-500' + userC}
          style={padding}
        >
          <AiOutlineUser className="m-1" />
          Users
        </Link>
      </div>
      {user ? <SignedIn /> : <SignedOut />}
    </div>
  )
}

export default NavBar
