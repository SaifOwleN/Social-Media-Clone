import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const likeBlogMutation = useMutation({
    mutationFn: blogService.incLikes,
  })
  const [user, setuser] = useState('')
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
    <div style={blogStyle} className="blog" key={blog.id}>
      <div className="TitleAndAuthor">
        {blog.title} {blog.author}{' '}
      </div>
    </div>
  )
}

export default Blog
