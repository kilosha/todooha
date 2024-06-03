import { SET_EDIT_ID, SET_TASK_TEXT } from '../actions/editModeActions';

const initialState = {
    editId: "",
    taskText: ""
}

const editModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EDIT_ID:
            return {
                ...state,
                editId: action.payload
            }
        case SET_TASK_TEXT:
            return {
                ...state,
                taskText: action.payload
            }
        default:
            return state;
    }
}

export default editModeReducer;