import { useState } from 'react'
import blogService from '../services/blogs'

const UserEditPage = ({ setModal }) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')
  const id = window.location.pathname.substr(7)

  const updateUser = async (e) => {
    e.preventDefault()
    if (repeatPass == pass) {
      const user = {
        username,
        name,
        password: pass,
      }
      const newUser = {}
      for (var k in user) {
        if (user[k] != '') {
          newUser[k] = user[k]
        }
      }
      await blogService.updateUser(newUser, id)
      setName('')
      setUsername('')
      setPass('')
      setRepeatPass('')
      const exitModal = () => {
        setModal(false)
      }
      exitModal()
    }
  }

  return (
    <form
      className="flex form-control items-center py-4 "
      onSubmit={updateUser}
      autoComplete="off"
    >
      <h2 className="text-2xl w-1/2 mb-4">Edit Your Credentials</h2>
      <label className="label w-1/2 ">
        <span className="label-text">New Name</span>
      </label>
      <input
        className="input input-primary  w-1/2"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="label w-1/2 ">
        <span className="label-text">New Username</span>
      </label>
      <input
        className="input input-primary  w-1/2"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="label w-1/2  ">
        <span className="label-text">New Password</span>
      </label>
      <input
        className="input input-primary w-1/2 "
        value={pass}
        name="passwordEdit"
        type="password"
        onChange={(e) => setPass(e.target.value)}
      />

      <label className="label w-1/2  ">
        <span className="label-text">Confirm Password</span>
      </label>
      <input
        className="input input-primary w-1/2 "
        value={repeatPass}
        name="repeatPass"
        type="password"
        onChange={(e) => setRepeatPass(e.target.value)}
      />
      <div className="w-1/2">
        <button type="submit" className="btn mt-4">
          Submit
        </button>
      </div>
      <div className="toast m-5">
        <div className="alert alert-success">{message}</div>
      </div>
    </form>
  )
}

export default UserEditPage
