import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import UserEditPage from './UserEdit'

Modal.setAppElement('#root')

const User = ({ user }) => {
  const id = useParams().id
  const [userP, setUserP] = useState()
  const [userBlogs, setUserBlogs] = useState()
  const blogs = useQuery({ queryKey: ['blogs', user] })
  const [modal, setModal] = useState(false)

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '1000px',
      background: 'rgba(50, 50, 50, 1)',
      'border-radius': '16px',
      border: '0px',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
    },
  }

  useEffect(() => {
    const xxdd = async () => {
      const xdd = await blogService.User(id)
      setUserP(xdd)
      const userBlogs = blogs.data.filter((blog) => xdd.blogs.includes(blog.id))
      setUserBlogs(userBlogs)
    }
    xxdd()
  }, [])

  return (
    <>
      <div className="m-0 p-0 w-screen flex justify-center ">
        <img src="/banner.webp" />
      </div>
      <div className="flex items-center mx-10 ">
        <label className="flex-none w-40 avatar ">
          <div className="rounded-full">
            <button className=" ">
              <img src={userP?.img} />
            </button>
          </div>
        </label>
        <h2 className="flex-1 text-3xl p-4">{userP?.name}</h2>
        <div className="flex-none">
          <button className="btn" onClick={() => setModal(true)}>
            Edit
          </button>
          <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={customStyles}
          >
            <UserEditPage setModal={setModal} />+
          </Modal>
        </div>
      </div>
      <div>
        {userBlogs?.map((blog) => (
          <div key={blog.id}>{blog.content}</div>
        ))}
      </div>
    </>
  )
}

export default User
