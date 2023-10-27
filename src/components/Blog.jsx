import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [user, setuser] = useState('')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    const xddMOTS = async () => {
      if (blog.user) {
        const xddMOTS = await blogService.getUsers(blog.user)
        setuser(xddMOTS)
      }
    }
    xddMOTS()
  }, [])

  return (
    <div style={blogStyle} className="blog" key={blog.id}>
      <div>{user}</div>
      <div className="TitleAndAuthor">{blog.content}</div>
    </div>
  )
}

export default Blog
