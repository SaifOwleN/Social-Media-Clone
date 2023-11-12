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
  const blogs = useQuery({ queryKey: ['blogs'] })
  const [modal, setModal] = useState(false)
  const [pfpModal, setPFPModal] = useState(false)

  useEffect(() => {
    const xxdd = async () => {
      const xdd = await blogService.User(id)
      setUserP(xdd)
      const userBlogs = blogs.data.filter((blog) => xdd.blogs.includes(blog.id))
      setUserBlogs(userBlogs)
      console.log(blogs.data)
    }
    xxdd()
  }, [])

  return (
    <>
      <div className="m-0 p-0 w-full flex justify-center ">
        <img src="/banner.webp" />
      </div>
      <div className="flex-none items-center">
        <label className="flex w-48 mx-40 -mt-20 avatar ">
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
      <div className="flex items-center mx-40 mt-4 ">
        <h2 className="flex-1 text-3xl ml-6 p-4">{userP?.name}</h2>
        <div className="flex-none">
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
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-20">
        <div className="max-w-[800px] ">
          {userBlogs?.map((blog) => (
            <Blog blog={blog} />
          ))}
        </div>
      </div>
    </>
  )
}

export default User
