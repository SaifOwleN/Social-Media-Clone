import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useState } from 'react'
const BlogPage = ({ user }) => {
  const id = useParams().id
  const query = useQuery({ queryKey: ['blogs'] })
  const blog = query.data.find((n) => n.id == id)
  const [Blikes, setBlikes] = useState(blog.likes)
  const [comment, setComment] = useState()
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
      <h2>{blog.title}</h2>
      <div>
        <a href={`${blog.url}`}>{blog.url}</a>
        <br />
        {Blikes} likes <button onClick={addLike}>Like</button>
        <br />
        Added By {user.name}
        <br />
        <button onClick={deleteBlog}>delete</button>
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
