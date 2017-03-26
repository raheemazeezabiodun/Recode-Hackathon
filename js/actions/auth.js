import {
    ACCOUNT_NUMBER_REQUEST,
    ACCOUNT_NUMBER_SUCCESS,
    ACCOUNT_NUMBER_FAILURE,
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE
} from '../constants';
import axios from 'axios';
import { 
    checkHttpStatus, 
    API_URL,
    client_id,
    client_secret,
    grant_type
} from '../utils';

const queryString = require('querystring');

export function accountRequest(){
    return {
        type: ACCOUNT_NUMBER_REQUEST
    }
}

export function accountSuccess(text){
    return {
        type: ACCOUNT_NUMBER_SUCCESS,
        payload: {
            data: text
        }
    }
}

export function accountFailure(error, message){
    return {
        type: ACCOUNT_NUMBER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    }
}

export function tokenRequest() {
    return {
        type: FETCH_TOKEN_REQUEST
    }
}

export function tokenSuccess(token) {
    return {
        type: FETCH_TOKEN_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function tokenFailure(error, message) {
    return {
        type: FETCH_TOKEN_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    }
}

export function fetchToken() {
    const data = queryString.stringify({
        client_id,
        client_secret,
        grant_type
    })
    return (dispatch) => {
        dispatch(tokenRequest())
        return axios.post(`${API_URL}/oauth/token`, data)
        .then(checkHttpStatus)
        .then((response) => {
            dispatch(tokenSuccess(response.data))
        })
        .catch((error) => {
            if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(tokenFailure(401, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(tokenFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(tokenFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve();
        });
    }
}

// export function speechAction(text){
//     return (dispatch) => {
//         dispatch(speechRequest());
//         return axios.post('http://paywcdevcenter.herokuapp.com/', {

//         })
//     }
// }