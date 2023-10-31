import { Link } from 'react-router-dom'
import Blog from './Blog'
import Toggleable from './Toggelable'
import CreationForm from './CreationForm'

const HomePage = ({ blogs, changeError }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="m-4">
      <CreationForm changeError={changeError} />
      <div className=" w-full flex flex-col items-center ">
        <div className="max-w-[800px]">
          <div className="">
            {blogs?.sort(byLikes).map((blog) => (
              <Link to={`/blogs/${blog.id}`}>
                <Blog blog={blog} blogs={blogs} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
