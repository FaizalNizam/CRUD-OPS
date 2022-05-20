import React from 'react'
import Head from './head/Head'
import Navbar from './navbar/Navbar'
import Table from './table/Table'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { readData } from '../redux/listAction'

function Home() {
  const listUser='User List'
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleClick=()=>{
    dispatch(readData({}))
    navigate('/add')
  }
  
  return (
    <div>
        <Head/>
        <Navbar display={listUser} title={'Would you like to add more users?'} button={'Add User'} handleClick={handleClick}/>
        <Table/>
    </div>
  )
}

export default Home