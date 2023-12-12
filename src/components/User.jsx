import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import UserEditPage from './UserEdit'
import ChangePFP from './ChangePFP'
import Blog from './Blog'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    background: 'rgba(0, 0, 0, 0.8)',
    'border-radius': '16px',
    border: '0px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
}
const modalImageStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    height: '500px',
    background: 'rgba(0, 0, 0, 0)',
    'border-radius': '16px',
    border: '0px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.2)',
  },
}
const User = ({ user, changeError }) => {
  const id = useParams().id
  const [userP, setUserP] = useState()
  const [userBlogs, setUserBlogs] = useState()
  const blogs = useQuery({ queryKey: ['blogs', user] })
  const [modal, setModal] = useState(false)
  const [pfpModal, setPFPModal] = useState(false)
  const [sameUser, setSameUser] = useState(false)
  useEffect(() => {
    const xxdd = async () => {
      const localStorage = window.localStorage.getItem('loggedUser')
      const signedUser = JSON.parse(localStorage)
      if (signedUser.id == id) {
        setSameUser(true)
      }
      const xdd = await blogService.User(id)
      setUserP(xdd)
      const userBlogs = blogs.data.filter((blog) => xdd.blogs.includes(blog.id))
      setUserBlogs(userBlogs)
      console.log(blogs.data)
    }
    xxdd()
  }, [])

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex-none items-center">
        <label className="flex w-48 mx-40 avatar ">
          <div className="rounded-full bg-black ">
            <button
              className="hover:opacity-80 transition-opacity"
              onClick={() => setPFPModal(true)}
            >
              <img src={userP?.img} />
            </button>
            <Modal
              isOpen={pfpModal}
              onRequestClose={() => setPFPModal(false)}
              style={modalImageStyles}
            >
              <div className="flex justify-center items-center avatar">
                <div className="h-[450px]  rounded-full">
                  <img src={userP?.img} className="" />
                </div>
              </div>
            </Modal>
          </div>
        </label>
      </div>
      <div className="flex items-center justify-between w-72 mt-6 ">
        <h2 className="flex-1 text-3xl p-4">{userP?.name}</h2>
        <div className="flex-none">
          {sameUser ? (
            <>
              <button className="btn" onClick={() => setModal(true)}>
                Edit
              </button>
              <Modal
                isOpen={modal}
                onRequestClose={() => setModal(false)}
                style={customStyles}
              >
                <UserEditPage setModal={setModal} changeError={changeError} />
              </Modal>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-20">
        <div className="max-w-[800px] ">
          {userBlogs?.map((blog) => (
            <Blog blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default User
