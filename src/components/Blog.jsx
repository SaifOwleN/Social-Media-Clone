import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import ReactModal from 'react-modal'
import { AiFillLike, AiOutlineComment } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog }) => {
  const [user, setuser] = useState('')
  const [modal, setModal] = useState(false)
  const [like, setLike] = useState(blog.likes.length)
  const queryClient = useQueryClient()
  const signedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  const likeBlogMutation = useMutation({
    mutationFn: blogService.incLikes,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    'border-color': 'gray',
    borderWidth: 1,
    marginBottom: 5,
  }

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,0,0,0)',
      height: '80vh',
      border: '0px',
    },
    overlay: {
      background: 'rgba(0,0,0,0.5)',
    },
  }

  const incLikes = (e) => {
    e.preventDefault()
    try {
      if (blog.likes.includes(signedUser.id)) {
        const arrayLikes = blog.likes.filter((b) => b.likes == signedUser.id)
        const blogToUpdate = { ...blog, likes: arrayLikes }
        likeBlogMutation.mutate(blogToUpdate)
        setLike(like - 1)
      } else {
        const arrayLikes = blog.likes.concat(signedUser.id)
        const blogToUpdate = { ...blog, likes: arrayLikes }
        likeBlogMutation.mutate(blogToUpdate)
        setLike(like + 1)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    const xddMOTS = async () => {
      if (blog.user) {
        const xddMOTS = await blogService.getUsers(blog.user)
        setuser(xddMOTS)
      }
    }
    xddMOTS()
  }, [])

  if (user) {
    return (
      <div style={blogStyle} className="blog rounded-lg" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          <div className="flex items-center ">
            <label tabIndex={0} className=" w-14 avatar mt-2 ml-4 ">
              <div className="rounded-full ">
                <img src={user.img} />
              </div>
            </label>
            <a className="p-2 font-inter font-semibold">{user.name}</a>
          </div>
        </Link>

        <div className="content mx-10 my-4">
          <p className="pl-10">{blog.content}</p>

          <div className="flex justify-center" onClick={() => setModal(true)}>
            <button>
              <img src={blog.img} className=" pt-3 " />
            </button>
          </div>
          <div className="stats-bar flex justify-between mx-20 text-xl mt-4 ">
            <div className="flex items-center ">
              <span className="pr-2">{like}</span>
              <button onClick={incLikes}>
                <AiFillLike />
              </button>
            </div>
            <div className="flex items-center">
              <span className="pr-2">{blog.comments.length}</span>
              <button>
                <AiOutlineComment />
              </button>
            </div>
            <div></div>
          </div>
          <ReactModal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={modalStyle}
          >
            <div className="flex justify-center items-center avatar h-full">
              <div className="h-full">
                <img src={blog.img} className=" " />
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    )
  }
}

export default Blog
