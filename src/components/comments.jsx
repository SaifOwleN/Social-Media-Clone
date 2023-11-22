import { useEffect, useState } from 'react'
import BlogService from '../services/blogs'
import { AiOutlineLike } from 'react-icons/ai'
const Comments = ({ comment }) => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const fetchUser = async () => {
      if (comment.user) {
        const user = await BlogService.getUsers(comment.user)
        setUser(user)
      }
    }
    fetchUser()
  }, [])
  return (
    <li>
      <div className="flex items-center ">
        <label tabIndex={0} className=" w-10 avatar mt-2 ">
          <div className="rounded-full ">
            <img src={user.img} />
          </div>
        </label>
        <a className="p-2 font-inter font-semibold">{user.name}</a>
      </div>
      <div className="flex items-center">
        <p className="m-4 ">{comment.content}</p>

        <AiOutlineLike />
      </div>
    </li>
  )
}
export default Comments
