import { ADD_TITLE } from '../actions/addInputActions';

const initialState = {
    title: ''
}

const addInputReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TITLE:
            return {
                ...state,
                title: action.payload
            }
        default:
            return state
    }
}

export default addInputReducer;