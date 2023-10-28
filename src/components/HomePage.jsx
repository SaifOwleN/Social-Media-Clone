import { Link } from 'react-router-dom'
import Blog from './Blog'
import Toggleable from './Toggelable'
import CreationForm from './CreationForm'

const HomePage = ({ blogs, changeError }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="m-4">
      <Toggleable buttonLabel="add blog">
        <CreationForm changeError={changeError} />
      </Toggleable>
      {blogs?.sort(byLikes).map((blog) => (
        <Link to={`/blogs/${blog.id}`}>
          <Blog blog={blog} blogs={blogs} />
        </Link>
      ))}
    </div>
  )
}
export default HomePage
