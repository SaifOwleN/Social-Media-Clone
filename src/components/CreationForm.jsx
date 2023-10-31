import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import TextareaAutosize from 'react-textarea-autosize'
import moment from 'moment'

const CreationForm = ({ changeError }) => {
  const [content, setContent] = useState('')
  const [img, setImg] = useState('')
  const [visible, setVisible] = useState(false)

  const queryClient = useQueryClient()
  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const changeVisiblity = () => {
    setVisible(!visible)
  }

  const handleCreation = async (e) => {
    e.preventDefault()
    const date = moment().format()
    const addedBlog = { content, img }
    addBlogMutation.mutate({ ...addedBlog, date })
    if (addBlogMutation.isError) {
      changeError('Enter any input into the content field')
    } else {
      changeError('a new blog has been posted')
      setContent('')
      setImg('')
      changeVisiblity()
    }
  }

  return (
    <div className="flex justify-center mb-4">
      <div style={hideWhenVisible}>
        <button onClick={changeVisiblity} className="btn btn-primary mb-4">
          xdd
        </button>
      </div>
      <div style={showWhenVisible} className="w-5/12">
        <form onSubmit={handleCreation} className="w-full ">
          <h3>Create blog</h3>
          <TextareaAutosize
            className="p-3 resize-none content textarea textarea-primary  my-4  w-full h-full"
            placeholder="what's on your mind ?"
            value={content}
            onChange={({ target }) => setContent(target.value)}
          />
          <br />
          <input
            placeholder="Add Image"
            className="w-full input input-secondary p-3 mb-4"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <br />
          <div className="buttons flex justify-between">
            <button type="submit" className="Create btn btn-accent mb-2">
              Create
            </button>
            <button
              onClick={changeVisiblity}
              className="btn btn-accent btn-outline "
              type="reset"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreationForm
