
import React, { useState, useEffect } from 'react'
import './table.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAction } from '../../redux/listAction'


function Table() {

  const navigate = useNavigate()

  const delUrl = 'https://gorest.co.in/public/v1/users'
  const url = 'https://gorest.co.in/public/v1/users'
  const token = '38768154575de830eba5672d754e7365c836fa8f42cb76186546018486801c64'

  //creating an instance of axios
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  //local states
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Asc')
  const [pages, setPages] = useState(1)


  const dispatch = useDispatch()
  const { data , pageLimit} = useSelector(state => state.userData)

  useEffect(() => {
    getUserData()

  }, [pages])

  const getUserData = () => {
    dispatch(getAction(pages))

  }

  //Routing to edit
  const handleEdit = (userId) => {
    navigate(`/add/${userId}`)
  }

  //for delete functionality
  const handleDelete = async (delId) => {
    await authAxios.delete(`${delUrl}/${delId}`)
    let response = await axios.get(url)
    if (response) {
      getUserData()
    }

  }

  //for search functionality
  const handleSearch = (e) => {
    setSearch(e.target.value)

  }

  //for sort functionality
  const sorting = (params) => {

    if (sort == 'Asc') {
      data.sort((a, b) => a[params].toLowerCase() > b[params].toLowerCase() ? 1 : -1)
      setSort('Dsc')
    }

    if (sort == 'Dsc') {
      data.sort((a, b) => a[params].toLowerCase() < b[params].toLowerCase() ? 1 : -1)
      setSort('Asc')
    }

  }

  //change status
  const changeStatus = async (status, id) => {

    if (status === 'active') {
      await authAxios.put(`${url}/${id}`, { status: 'inactive' })
      getUserData()

    }
    else {
      await authAxios.put(`${url}/${id}`, { status: 'active' })
      getUserData()
    }
  }


  return (
    <div className='component'>
      <label htmlFor="">Search: </label>
      <input style={{ marginLeft: '10px' }} type="text" placeholder='Search by Name and Email' onChange={(e) => handleSearch(e)} />

      <table>
        <thead>
          <tr>
            <th onClick={() => sorting('name')} style={{ cursor: 'pointer' }} >Name </th>
            <th onClick={() => sorting('email')} style={{ cursor: 'pointer' }}>Email</th>
            <th onClick={() => sorting('gender')} style={{ cursor: 'pointer' }}>Gender</th>
            <th>Action</th>
          </tr>
        </thead>

        {data && data.filter(obj => obj.name.toLowerCase().includes(search.toLowerCase())).map((obj) => (
          <tbody key={obj.id}>
            <tr>
              <td >{obj.name} <div className='indicator' style={obj.status === 'active' ? { backgroundColor: '#04b55c' } : { backgroundColor: '#e81a0c' }}></div></td>
              <td >{obj.email}</td>
              <td >{obj.gender}</td>
              <td>
                <div className="dropdown" >
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-three-dots"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><button onClick={() => handleEdit(obj.id)} className="dropdown-item" type="button">Edit</button></li>
                    <li><button onClick={() => { handleDelete(obj.id); return window.confirm('Are you sure you want to delete?') }} className="dropdown-item" type="button">Delete</button></li>
                    <li><button onClick={() => changeStatus(obj.status, obj.id)} className="dropdown-item" type="button">{obj.status == 'active' ? 'inactive' : 'active'}</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>

        ))
        }

      </table><br />

      {pageLimit && <div className='d-flex justify-content-center'>
        <ul className='pagination'>
          {pages > 1 ? <li className="page-link" role='button' onClick={() => setPages(1)}>Start</li> : null}
          {pages > 1 ? <li className="page-link" role='button' onClick={() => setPages(pages > 1 ? pages - 1 : null)}><i className="bi bi-skip-backward-circle"></i></li> : null}
          {pages > 2 ? <li className="page-link" role='button' onClick={() => setPages(pages - 2)}>{pages - 2}</li> : null}
          {pages > 1 ? <li className="page-link" role='button' onClick={() => setPages(pages - 1)}>{pages - 1}</li> : null}
          <li className="page-link" role='button' style={{ backgroundColor: '#9abef5' }}>{pages}</li>
          {pages < pageLimit ? <li className="page-link" role='button' onClick={() => setPages(pages + 1)}>{pages + 1}</li> : null}
          {pages < pageLimit - 1 ? <li className="page-link" role='button' onClick={() => setPages(pages + 2)}>{pages + 2}</li> : null}
          {pages < pageLimit ? <li className="page-link" role='button' onClick={() => setPages(pages + 1)}><i className="bi bi-skip-forward-circle"></i></li> : null}
          {pages < pageLimit ? <li className="page-link" role='button' onClick={() => setPages(pageLimit)}>End</li> : null}
        </ul>

      </div>
      }

    </div>
  )
}

export default Table