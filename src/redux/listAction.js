import axios from "axios";



const url = 'https://gorest.co.in/public/v1/users'
const token = '38768154575de830eba5672d754e7365c836fa8f42cb76186546018486801c64'


const authAxios = axios.create({
    headers: {
        Authorization: `Bearer ${token}`
    }
})


//Table data
export const getAction = (pages) => async (dispatch) => {
    try {
        let response = await axios.get(`${url}?page=${pages}`)
        let data = response.data.data
        let pageLimit = response.data.meta.pagination.pages

        dispatch({ type: 'tableData', payload: { data: data, pageLimit: pageLimit } })

    } catch (error) {
        console.log('Error while calling api', error)
    }

}

//user data by user id
export const getUserAction = (user_id) => async (dispatch) => {
    try {
        let response = await axios.get(`${url}/${user_id}`)
        let userData = response.data.data
        dispatch({ type: 'userData', payload: userData })

    } catch (error) {
        console.log('Error while calling api', error)
    }
}


//edit user data
export const putAction = (data, user_id) => async (dispatch) => {
    try {

        let response = await authAxios.put(`${url}/${user_id}`, data)
        return response

    } catch (error) {
        console.log('Error while calling api', error)
    }

}


//create new user
export const postAction = (data) => async (dispatch) => {
    try {
        dispatch({type:'error',payload:{}})
        let response=await authAxios.post(url, data)
        return response
        
    } catch (error) {
        console.log('Error while calling api', error)
        let response = {}
        response.field = error.response.data.data[0].field
        response.message = error.response.data.data[0].message
        dispatch({type:'error',payload:response})
    }

}


//input data from form
export const readData = (inputData)=>(dispatch)=>{

    dispatch({type:'userInput', payload:inputData})

}


