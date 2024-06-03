import { getTasks } from "../../helpers/getTasks";
import { TASK_ACTIONS } from '../actions/taskActions';

const initialState = { tasks: getTasks() };

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_ACTIONS.ADD_NEW_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case TASK_ACTIONS.DELETE_TASK:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
        case TASK_ACTIONS.UPDATE_TASK:
            return {
                ...state, tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, title: action.payload.newText } : task
                )
            };
        case TASK_ACTIONS.COMPLETE_TASK:
            return {
                ...state, tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
                )
            };
        default:
            return state;
    }
}

export default taskReducer;