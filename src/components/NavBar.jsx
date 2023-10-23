import { Link } from 'react-router-dom'

const NavBar = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to={'/'} style={padding}>
        Home
      </Link>
      <Link to={'/users'}>Users</Link>
    </div>
  )
}

export default NavBar
