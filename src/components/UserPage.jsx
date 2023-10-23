import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const UserPage = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: blogService.getAllUsers,
  })
  const users = query.data

  return (
    <>
      <h2>Users</h2>
      {users?.map((user) => (
        <div key={user.id} style={{ display: 'flex' }}>
          <Link to={`/users/${user.id}`} style={{ paddingRight: 20 }}>
            {user.name}
          </Link>
          <a>{user.blogs.length}</a>{' '}
        </div>
      ))}
    </>
  )
}

export default UserPage
