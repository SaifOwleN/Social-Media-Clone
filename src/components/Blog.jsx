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

  if (user) {
    return (
      <div style={blogStyle} className="blog rounded-lg" key={blog.id}>
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="rounded-full w-10">
              <img src={user.img} />
            </div>
          </label>
          <a className="p-2">{user.name}</a>
        </div>
        <div className="content mx-4 my-2">{blog.content}</div>
      </div>
    )
  }
}

export default Blog
