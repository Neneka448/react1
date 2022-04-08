import {applyMiddleware, combineReducers, createStore} from "redux";
import GlobalActionReducer from "./GlobalActionReducer";
import SagaRoot from "@/api/SagaRoot/SagaRoot";
import createSagaMiddleware from "redux-saga"
import {sagaReducer} from "@/api";
const sagaMiddleware=createSagaMiddleware()

const store = createStore(combineReducers({
  sagaReducer,
  GlobalActionReducer,
}),applyMiddleware(sagaMiddleware))


sagaMiddleware.run(SagaRoot)

export default store