import React from 'react'
import './Navbar.css'

function Navbar(props) {


  return (
    <div className='component'>
      <h3 className="userlist">{props.display}</h3>
      <p>Basic information associated with your profile</p><br />
      <div className='subdiv'>
        <p className='p2'>{props.display2} {props.title}</p>
        <button className='button' onClick={props.handleClick}>{props.display3} {props.button}</button>
      </div>
    </div>
  )
}

export default Navbar