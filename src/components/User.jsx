import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const User = ({ user }) => {
  const id = useParams().id
  const [userP, setUserP] = useState()
  const [userBlogs, setUserBlogs] = useState()
  const blogs = useQuery({ queryKey: ['blogs', user] })

  useEffect(() => {
    const xxdd = async () => {
      const xdd = await blogService.User(id)
      setUserP(xdd)
      const userBlogs = blogs.data.filter((blog) => xdd.blogs.includes(blog.id))
      setUserBlogs(userBlogs)
    }
    xxdd()
  }, [])
  return (
    <>
      <div className="m-0 p-0 w-screen flex justify-center ">
        <img src="/banner.webp" />
      </div>
      <div className="flex items-center mx-10 ">
        <label className="flex-none w-40 avatar ">
          <div className="rounded-full">
            <button className=" ">
              <img src={userP?.img} />
            </button>
          </div>
        </label>
        <h2 className="flex-1 text-3xl p-4">{userP?.name}</h2>
        <div className="flex-none">
          <a className="btn">Edit</a>
        </div>
      </div>
      <div>
        {userBlogs?.map((blog) => (
          <div key={blog.id}>{blog.content}</div>
        ))}
      </div>
    </>
  )
}

export default User
