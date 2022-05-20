import React, { useEffect, useState } from 'react'
import './add.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, postAction, putAction, readData } from '../../redux/listAction'


const url = 'https://gorest.co.in/public/v1/users'
const token = '38768154575de830eba5672d754e7365c836fa8f42cb76186546018486801c64'

const authAxios = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${token}`
    }
})

function AddUser(props) {

    let { user_id } = useParams()

    const navigate = useNavigate()

    const [error, setError] = useState({})

    const dispatch = useDispatch()

    const { userDetail } = useSelector(state => state)
    const { errorData } = useSelector(state => state)


    //fetching values from input field
    const handleChange = (e) => {
        dispatch(readData({ ...userDetail, [e.target.name]: e.target.value }))
        setError({ ...error, [e.target.name]: '' })
    }

    //submission after form validation
    const submit = () => {

        let error = formValidation()

        if (Object.keys(error).length === 0) {

            submitChange()
        }
    }

    const submitChange = async () => {
        if (user_id) {

            let response = await dispatch(putAction(userDetail, user_id))
            if (response) {
                navigate('/')
            }

        } else {

            let response = await dispatch(postAction(userDetail))
            if (response) {
                navigate('/')
            }
        }
    }


    useEffect(() => {
        if (user_id) {
            getData()
        }

    }, [])

    const getData = () => {
        dispatch(getUserAction(user_id))
    }


    const handleCancel = () => {
        navigate('/')
    }


    //form validation
    const formValidation = () => {

        let error = {}

        if (!userDetail.name) {
            error.name = 'Name field is mandatory'
        }
        if (!userDetail.email) {
            error.email = 'Email required'
        }
        if (!userDetail.gender) {
            error.gender = 'select gender'
        }
        if (!userDetail.status) {
            error.status = 'select status'
        }

        setError(error)
        return error
    }


    return (

        <div className='component'>
            <div className='head'>
                <label className='userlabel'>User List : </label>
                <a href=""> {props.display2}</a>
            </div>
            <label className='labelhead'>Users Profile Details:</label><br /><br />



            <label className='labels'>Name</label><br />
            <input type="text" placeholder='Name' id='name' onChange={(e) => handleChange(e)} name='name' value={userDetail.name} /> <br />
            <label className='error'>{error.name}</label><br />


            <label className='labels'>Email</label><br />
            <input type="email" placeholder='Email' onChange={(e) => handleChange(e)} name='email' value={userDetail.email} /> <br />
            <label className='error'>{error.email}</label> <br />
            <label className='error'>{errorData.field} {errorData.message}</label> <br /><br />

            <label className='labels'>Gender</label><br />
            <div className='radioGroup'>
                <div className='radios'>
                    <input type="radio" onChange={(e) => handleChange(e)} name='gender' value='male' id='male' checked={userDetail.gender == "male"} />
                    <label className='radioLabel'>Male</label>
                </div>
                <div className='radios'>
                    <input type="radio" onChange={(e) => handleChange(e)} name='gender' value='female' id='female' checked={userDetail.gender == "female"} />
                    <label className='radioLabel'>Female</label>
                </div><br /><br />
                <label className='error'>{error.gender}</label>
            </div>

            <label className='labels'>Status</label><br />
            <select value={userDetail.status} className='select' name='status' onChange={(e) => handleChange(e)}>
                <option value="">select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select> <br />
            <label className='error'>{error.status}</label>

            <br />
            <button className='cancel' onClick={handleCancel} >Cancel</button>
            <button className='save' onClick={submit}>{props.button}</button>

        </div>


    )
}

export default AddUser