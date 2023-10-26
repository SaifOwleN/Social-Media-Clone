import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const CreationForm = ({ setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const handleCreation = async (e) => {
    e.preventDefault()
    addBlogMutation.mutate({ title, author, url })

    setErrorMessage(`a new blog has been added: ${title}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreation}>
      <h3>Create blog</h3>
      title:{' '}
      <input
        className="title input input-primary"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:{' '}
      <input
        className="author input-primary"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:{' '}
      <input
        className="url input-primary"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit" className="Create btn">
        Create
      </button>
    </form>
  )
}
export default CreationForm
