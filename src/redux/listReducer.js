

export const getReducer = (state = { userData: [] ,userDetail: {}, errorData:{} }, action) => {
    switch (action.type) {
        case 'tableData':

            return {...state, userData: action.payload }

        case 'userData':

            return { ...state,userDetail: action.payload }

        case 'error':

            return { ...state,errorData: action.payload }

        case 'userInput':

            return {...state, userDetail: action.payload }

        default:
            return state
    }

}