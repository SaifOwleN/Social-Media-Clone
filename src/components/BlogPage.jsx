import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'

const BlogPage = ({ user }) => {
  const id = useParams().id
  const query = useQuery({ queryKey: ['blogs'] })
  const blog = query.data.find((n) => n.id == id)
  const [Blikes, setBlikes] = useState(blog.likes)
  const [comment, setComment] = useState()
  const [userBlog, setUserBlog] = useState('')

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const likeBlogMutation = useMutation({
    mutationFn: blogService.incLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  useEffect(() => {
    const user1 = async () => {
      if (blog.user) {
        const userxdd = await blogService
          .User(blog.user)
          .then((res) => res.name)
        setUserBlog(userxdd)
      }
    }
    user1()
  }, [])

  const addLike = async () => {
    const blogToUpdate = { ...blog, likes: Blikes + 1 }
    try {
      likeBlogMutation.mutate(blogToUpdate)
      setBlikes(Blikes + 1)
    } catch (error) {
      console.log('error')
    }
  }

  const deleteBlog = () => {
    deleteBlogMutation.mutate(blog.id)
    navigate('/')
  }

  const addComment = (e) => {
    e.preventDefault()
    addCommentMutation.mutate({ id: blog.id, comment })
    setComment('')
  }

  return (
    <div>
      <h2 className="text-3xl m-2">Post</h2>
      <div className="m-41">
        <a>{userBlog}</a>
        <br />
        <a>{blog.content}</a>
        <br />
        {Blikes} likes <button onClick={addLike}>Like</button>
        <br />
        {userBlog == user.name ? (
          <button onClick={deleteBlog}>delete</button>
        ) : (
          ''
        )}
        <br />
        <Moment date={blog.date} format="h:mm a · MMM DD, YYYY" />
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((com) => (
            <li key={Math.random() * 1000}>{com}</li>
          ))}
        </ul>
        <form onSubmit={addComment}>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
          <button>comment</button>
        </form>
      </div>
    </div>
  )
}

export default BlogPage
