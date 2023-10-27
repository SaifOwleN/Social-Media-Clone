import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'

const CreationForm = ({ setErrorMessage }) => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const handleCreation = async (e) => {
    e.preventDefault()
    const date = moment().format()

    addBlogMutation.mutate({ content, date })

    setErrorMessage(`a new blog has been posted`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
    setContent('')
  }

  return (
    <form onSubmit={handleCreation} className="w-full ">
      <h3>Create blog</h3>
      <TextareaAutosize
        className="p-2 content input input-bordered my-4 overflow-x-auto  w-full h-full"
        placeholder="what's on your mind ?"
        value={content}
        onChange={({ target }) => setContent(target.value)}
      />
      <br />
      <button type="submit" className="Create btn">
        Create
      </button>
    </form>
  )
}
export default CreationForm
