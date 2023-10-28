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
    <div className="flex justify-center mb-4">
      <div style={hideWhenVisible}>
        <button onClick={changeVisiblity} className="btn btn-primary mb-4">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="w-6/12">
        {props.children}
        <button
          onClick={changeVisiblity}
          className="btn btn-accent btn-outline "
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
