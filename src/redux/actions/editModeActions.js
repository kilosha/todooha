export const SET_EDIT_ID = 'SET_EDIT_ID';
export const SET_TASK_TEXT = 'SET_TASK_TEXT';

export const setEditId = id => {
    return {
        type: SET_EDIT_ID,
        payload: id
    }
}

export const setTaskText = title => {
    return {
        type: SET_TASK_TEXT,
        payload: title
    }
}