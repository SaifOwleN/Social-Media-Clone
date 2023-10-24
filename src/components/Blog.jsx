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

  return (
    <div style={blogStyle} className="blog">
      <div className="TitleAndAuthor">
        {blog.title} {blog.author}{' '}
      </div>
    </div>
  )
}

export default Blog
