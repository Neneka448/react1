import {combineReducers, createStore} from "redux";
import UserReducer from "./UserReducer";

const store = createStore(combineReducers({
  UserReducer,
}))

export default store