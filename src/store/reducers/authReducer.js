import * as actionType from '../actions/types/authActionTypes';

const initialState = {
    loading: false,
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            }
        case actionType.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionType.LOGOUT:
            return {
                ...state,
                user: null
            }
        case actionType.SIGNUP_START:
            return {
                ...state,
                loading: true
            }
        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user
            }
        case actionType.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;