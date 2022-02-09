
import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notifications)
  const notification = props.notifications

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== '') {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    anecdotes: state.anecdotes,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

//export default Notification