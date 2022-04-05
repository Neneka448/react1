import {combineReducers, createStore} from "redux";
import GlobalActionReducer from "./GlobalActionReducer";
import UserReducer from "./UserReducer";

const store = createStore(combineReducers({
  UserReducer,
  GlobalActionReducer
}))

export default store