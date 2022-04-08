import {takeLatest} from 'redux-saga/effects'
import {loginFlow} from "@/api/Authorization/Authorization";
import {passageDetailFlow} from "@/api/Passage/PassageDetail";
import {passageListFlow} from "@/api/Passage/PassageList";
export type REQUEST_LIST="AUTHORIZATION_REQUEST"|"PASSAGE_DETAIL_REQUEST"|"PASSAGE_LIST_REQUEST"





function* SagaRoot(){
  yield takeLatest("AUTHORIZATION_REQUEST",loginFlow)
  yield takeLatest("PASSAGE_DETAIL_REQUEST",passageDetailFlow)
  yield takeLatest("PASSAGE_LIST_REQUEST",passageListFlow)
}


export default SagaRoot