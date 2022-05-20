import React from 'react'
import Head from './head/Head'
import Navbar from './navbar/Navbar'
import AddUser from './add user/AddUser'
import { useParams,useNavigate } from 'react-router-dom'


function AddUserDetails() {

  let { user_id } = useParams()
  const navigate=useNavigate()

  const create = 'Create user'
  const edit = 'Edit user'

  const save = 'save'
  const update = 'update'

  const createDetails = 'Create new user'
  const editDetails = 'Update user details'

  const handleClick=()=>{
    navigate('/')
  }

  return (
    <div>
      <Head />
      <Navbar 
      display={user_id ? edit : create} 
      display2={'List all users'} 
      display3={'List users'} handleClick={handleClick } />
      
      <AddUser button={user_id ? update : save} display2={user_id ? editDetails : createDetails} />
    </div>

  )
}

export default AddUserDetails