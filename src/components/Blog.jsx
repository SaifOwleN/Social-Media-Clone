import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, blogs, setBlogs }) => {
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const likeBlogMutation = useMutation({
    mutationFn: blogService.incLikes,
  })

  const [visible, setVisible] = useState(false)
  const [user, setuser] = useState('')
  const [Blikes, setBlikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const loggedUser = localStorage.getItem('loggedUser')
  const User = JSON.parse(loggedUser)
  const username = User.name

  useEffect(() => {
    const xddMOTS = async () => {
      if (blog.user) {
        const xddMOTS = await blogService.getUsers(blog.user)
        setuser(xddMOTS)
      }
    }
    xddMOTS()
  }, [])

  const addLike = async () => {
    const blogToUpdate = { ...blog, likes: Blikes + 1 }
    try {
      likeBlogMutation.mutate(blogToUpdate)
      setBlikes(Blikes + 1)
      blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    } catch (error) {
      console.log('error')
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle} className="blog">
      <div className="TitleAndAuthor">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibilty}>show</button>
      </div>
      <div
        style={{ display: visible == false ? 'none' : '' }}
        className="urlAndLikes"
      >
        <a href={blog.url}>{blog.url}</a> <br /> likes: {Blikes}{' '}
        <button onClick={addLike}>like</button> <br /> {user}
        <div>
          {user == username ? (
            <button onClick={handleDelete}>delete</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
