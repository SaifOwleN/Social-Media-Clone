import { useState } from 'react'

const UserEditPage = () => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')

  return (
    <div className="flex justify-center">
      <input
        className="input input-primary"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

export default UserEditPage
