import { useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const changeVisiblity = () => {
    setVisible(!visible)
  }

  return (
    <div className="flex justify-center ">
      <div style={hideWhenVisible}>
        <button onClick={changeVisiblity} className="btn btn-primary">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="flex justify-center  w-6/12">
        {props.children}
        <button
          onClick={changeVisiblity}
          className="btn btn-accent btn-outline w-20 "
        >
          cancel
        </button>
      </div>
    </div>
  )
}
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggleable
