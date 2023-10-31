import { useState } from 'react'
import blogService from '../services/blogs'

const ChangePFP = ({ setPFPModal }) => {
  const [urlImg, setUrlImg] = useState('')
  const id = window.location.pathname.substr(7)

  const uploadNewPFP = async (e) => {
    e.preventDefault()
    await blogService.updateUser({ img: urlImg }, id)
    setPFPModal(false)
  }

  return (
    <form className="flex flex-col items-center " onSubmit={uploadNewPFP}>
      <label className=" mb-4 label label-text">Enter Your New PFP's url</label>
      <input
        className="input input-primary w-6/12 "
        value={urlImg}
        onChange={(e) => setUrlImg(e.target.value)}
        placeholder="image url"
      />
      <div className="w-1/2 flex justify-between">
        <button type="submit" className="btn mt-4 btn-accent">
          Submit
        </button>
        <button
          type="reset"
          onClick={() => setPFPModal(false)}
          className="btn mt-4 btn-accent"
        >
          Exit
        </button>
      </div>
    </form>
  )
}
export default ChangePFP
