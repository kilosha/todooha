export const TASK_ACTIONS = {
    ADD_NEW_TASK: "ADD_NEW_TASK",
    DELETE_TASK: "DELETE_TASK",
    UPDATE_TASK: "UPDATE_TASK",
    COMPLETE_TASK: "COMPLETE_TASK"
}

export const addNewTask = task => {
    return {
        type: "ADD_NEW_TASK",
        payload: task
    }
}

export const deleteTask = id => {
    return {
        type: "DELETE_TASK",
        payload: id
    }
}

export const updateTask = (id, newText) => {
    return {
        type: "UPDATE_TASK",
        payload: { id, newText }
    }
}

export const completeTask = id => {
    return {
        type: "COMPLETE_TASK",
        payload: id
    }
}