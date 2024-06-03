export const ADD_TITLE = 'ADD_TITLE';

export const addTitle = title => {
    return {
        type: ADD_TITLE,
        payload: title
    }
}