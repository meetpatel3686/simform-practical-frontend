import { put, takeLatest, all } from 'redux-saga/effects';
import FormAPI from "../apis/FormAPI";

function* fetchForms() {
    try {
        const response = yield FormAPI.get('/form').then(res => res.data);
        yield put({ type: "GET_ALL_FORMS_SUCCESS", payload: response });   
    } catch (error) {
        yield put({ type: "GET_ALL_FORMS_FAILURE", payload: error.response.data });
    }
}

function* fetchFormByID(action) {
    const {id} = action;
    try {
        const response = yield FormAPI.get(`/form/${id}`).then(res => res.data);
        yield put({ type: "GET_FORM_SUCCESS", payload: response });   
    } catch (error) {
        yield put({ type: "GET_FORM_FAILURE", payload: error.response.data });
    }
}

function* postForm(action) {
    const {form} = action;
    try {
        const response = yield FormAPI.post('/form', form).then(res => res.data);
        yield put({ type: "POST_FORM_SUCCESS", payload: response });   
    } catch (error) {
        yield put({ type: "POST_FORM_FAILURE", payload: error.response.data });
    }
}

function* postSurvey(action) {
    const {survey} = action;
    try {
        const response = yield FormAPI.post('/form/submit', survey).then(res => res.data);
        yield put({ type: "POST_SURVEY_SUCCESS", payload: response });
    } catch (error) {
        yield put({ type: "POST_SURVEY_FAILURE", payload: error.response.data });
    }
}

function* actionWatcher() {
     yield takeLatest('GET_ALL_FORMS', fetchForms);
     yield takeLatest('GET_FORM', fetchFormByID);
     yield takeLatest('POST_FORM', postForm);
     yield takeLatest('POST_SURVEY', postSurvey);
}
export default function* rootSaga() {
   yield all([actionWatcher()]);
}