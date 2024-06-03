import { legacy_createStore as createStore, combineReducers } from "redux";
import taskReducer from "./reducers/taskReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import addInputReducer from "./reducers/addInputReducer";
import editModeReducer from "./reducers/editModeReducer";

const rootReducer = combineReducers({
    list: taskReducer,
    addInput: addInputReducer,
    editTask: editModeReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;