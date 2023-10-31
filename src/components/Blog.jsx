import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [user, setuser] = useState('')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    'border-color': 'gray',
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
        <div className="flex items-center ">
          <label tabIndex={0} className=" w-14 avatar mt-2 ml-4 ">
            <div className="rounded-full ">
              <img src={user.img} />
            </div>
          </label>
          <a className="p-2 font-inter font-semibold">{user.name}</a>
        </div>
        <div className="content mx-10 my-4">
          <p className="pl-10">{blog.content}</p>
          <div className="flex justify-center">
            <img src={blog.img} className=" pt-3 " />
          </div>
        </div>
      </div>
    )
  }
}

export default Blog
