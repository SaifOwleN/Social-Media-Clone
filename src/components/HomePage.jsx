import { Link } from 'react-router-dom'
import Blog from './Blog'
import Toggleable from './Toggelable'
import CreationForm from './CreationForm'

const HomePage = ({ blogs, setErrorMessage }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div key={Math.random() * 100}>
      <Toggleable buttonLabel="add blog">
        <CreationForm setErrorMessage={setErrorMessage} />
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
