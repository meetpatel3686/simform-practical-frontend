const initialState = {
    forms:null,
    loading:false,
    error:null,
    receivedForm:null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_FORMS':
            return { ...state, loading: true };
        case 'GET_ALL_FORMS_SUCCESS':
           return {...state, forms:action.payload, loading:false}
        case 'GET_ALL_FORMS_FAILURE':
            return {...state, error:action.payload, loading:false}
        case 'GET_FORM':
            return {...state, loading: true};
        case 'GET_FORM_SUCCESS':
            return {...state, receivedForm:action.payload, loading:false}
        case 'GET_FORM_FAILURE':
            return {...state, error:action.payload, loading:false}
        case 'POST_FORM':
            return { ...state, postedForm:null, loading: true};
        case 'POST_FORM_SUCCESS':
            return {...state, postedForm:action.payload, loading:false}
        case 'POST_FORM_FAILURE':
            return {...state, error:action.payload, loading:false}
        case 'POST_SURVEY':
            return {...state, postedSurvey: null, loading:true}
        case 'POST_SURVEY_SUCCESS':
            return {...state, postedSurvey: action.payload, loading:false}
        case 'POST_SURVEY_FAILURE':
            return {...state, error:action.payload, loading:false}
        default:
            return state;
    }
}

export default reducer;