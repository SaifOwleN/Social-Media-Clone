import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import ReactModal from 'react-modal'
import ReactTextareaAutosize from 'react-textarea-autosize'
import Comments from './comments'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  'border-color': 'gray',
  borderWidth: 1,
  marginBottom: 5,
  width: '34%',
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

const BlogPage = ({ user, setError }) => {
  const id = useParams().id
  const query = useQuery({ queryKey: ['blogs', user] })
  const blog = query.data.find((n) => n.id == id)
  const [Blikes, setBlikes] = useState(blog.likes)
  const [comment, setComment] = useState()
  const [userBlog, setUserBlog] = useState('')
  const [modal, setModal] = useState(false)

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
    onError: () => console.log('error'),
  })

  useEffect(() => {
    const user1 = async () => {
      if (blog.user) {
        const userxdd = await blogService.User(blog.user).then((res) => res)
        setUserBlog(userxdd)
      }
    }
    user1()
  }, [])

  const addLike = async () => {
    try {
      if (blog.likes.includes(user.id)) {
        const arrayLikes = blog.likes.filter((b) => b != user.id)

        const blogToUpdate = { ...blog, likes: arrayLikes }
        setBlikes(arrayLikes.length)

        likeBlogMutation.mutate(blogToUpdate)
      } else {
        const arrayLikes = blog.likes.concat(user.id)
        const blogToUpdate = { ...blog, likes: arrayLikes }
        setBlikes(arrayLikes.length)

        likeBlogMutation.mutate(blogToUpdate)
      }
    } catch (error) {
      console.log('error')
    }
  }

  const deleteBlog = () => {
    deleteBlogMutation.mutate(blog.id)
    setError(`a blog has been deleted`)
    navigate('/')
  }

  const addComment = (e) => {
    e.preventDefault()
    const addedComment = comment
    addCommentMutation.mutate({
      id: blog.id,
      comment: { content: comment, user: user.id },
    })
    setComment('')
  }
  const textAreaTweak = (e) => {
    if ((e.keyCode == 13 || e.which == 13) && !e.shiftKey) {
      const event = { preventDefault: () => console.log('xdd') }
      e.preventDefault()
      addComment(event)
    }
  }

  if (userBlog) {
    return (
      <div className="flex justify-center mt-2">
        <div style={blogStyle} className="blog rounded-lg" key={blog.id}>
          <div className="flex items-center ">
            <label tabIndex={0} className=" flex-0 w-14 avatar mt-2 ml-4 ">
              <div className="rounded-full ">
                <img src={userBlog.img} />
              </div>
            </label>
            <a className="p-2 font-inter font-semibold flex-1">
              {userBlog.name}
            </a>
            {userBlog.name == user.name ? (
              <div className="dropdown dropdown-end">
                <button className="flex-0 pr-6 text-2xl text-white">
                  <BiDotsHorizontalRounded />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu mr-5 shadow bg-black rounded-lg w-28"
                >
                  <li onClick={deleteBlog}>
                    <a>delete</a>
                  </li>{' '}
                </ul>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="content mx-2 my-4">
            <p className="pl-3">{blog.content}</p>
            <div className="flex justify-center">
              <button onClick={() => setModal(true)} className="w-full mt-4">
                <img src={blog.img} className="w-full px-3 rounded-2xl" />
              </button>
            </div>
            <Moment
              date={blog.date}
              format="h:mm a · MMM DD, YYYY"
              className="text-sm font-montserrat p-4"
            />
            <div className="h-[1px] w-full bg-white my-2"></div>

            <div className="stats-bar flex justify-evenly text-xl ">
              <div className="flex items-center">
                <span className="pr-2">{blog.likes.length}</span>
                <button onClick={addLike}>
                  <AiOutlineLike />
                </button>
              </div>
              <div className="flex items-center">
                <span className="pr-2">{blog.comments.length}</span>
                <button>
                  <AiOutlineComment />
                </button>
              </div>
            </div>
            <div className="h-[1px] w-full bg-white my-2"></div>

            <form onSubmit={addComment} className="flex items-center mt-4 px-2">
              <ReactTextareaAutosize
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                className="textarea textarea-accent resize-none  w-full h-20 mr-2 "
                placeholder="comment"
                onKeyPress={textAreaTweak}
              />
              <button className="btn btn-accent">comment</button>
            </form>
            <div className="m-4">
              <ul>
                {blog.comments.map((com) => (
                  <Comments comment={com} id={blog.id} />
                ))}
              </ul>
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
      </div>
    )
  }
}

export default BlogPage
