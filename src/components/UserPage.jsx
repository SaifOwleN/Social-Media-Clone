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
    <div className="w-6/12">
      <h2 className="m-3 text-4xl">Users</h2>
      <table className="table text-xl">
        <thead>
          <tr className="text-lg">
            <th>user</th>
            <th>No. of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} style={{ paddingRight: 20 }}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserPage
