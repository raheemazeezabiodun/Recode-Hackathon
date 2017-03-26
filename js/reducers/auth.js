import { createReducer } from '../utils';
import {
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE
} from '../constants';


const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [FETCH_TOKEN_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null
        });
    },
    [FETCH_TOKEN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            statusText: 'Token got'
        });
    },
    [FETCH_TOKEN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            statusText: `Authentication Error: ${payload.status} - ${payload.statusText}`
        });
    }
});