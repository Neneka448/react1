import {combineReducers} from "redux";
import {passageDetailReducer} from "@/api/Passage/PassageDetail";
import {passageListReducer} from "@/api/Passage/PassageList";
import {AuthorizationReducer} from "@/api/Authorization/Authorization";
import {UserReducer} from "@/api/User/UserInfo";

export const sagaReducer=combineReducers({
    AuthorizationReducer,
    passageDetailReducer,
    passageListReducer,
    UserReducer,
  }
)