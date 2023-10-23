import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const User = () => {
  const id = useParams().id
  const [user, setUser] = useState()
  const [userBlogs, setUserBlogs] = useState()
  const blogs = useQuery({ queryKey: ['blogs'] })

  useEffect(() => {
    const xxdd = async () => {
      const xdd = await blogService.User(id)
      setUser(xdd)
      const userBlogs = blogs.data.filter((blog) => xdd.blogs.includes(blog.id))
      setUserBlogs(userBlogs)
    }
    xxdd()
  }, [])
  return (
    <>
      <h2>{user?.name}</h2>
      <div>
        {userBlogs?.map((blog) => (
          <div key={blog.id}>{blog.title}</div>
        ))}
      </div>
    </>
  )
}

export default User
