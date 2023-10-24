import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const NavBar = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link to={'/'} style={padding}>
        Home
      </Link>
      <Link to={'/users'} style={padding}>
        Users
      </Link>
      {user.name} is logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar
