export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function parseJSON(response) {
    return response.json();
}

export const API_URL = 'https://pwcstaging.herokuapp.com';
export const client_id = '58d557dc4637e61000b651e6';
export const client_secret = 'lfv78LRsCLPFybYE4zoDx5y3xZpuoYj4usgzONzNAz7N9sGCp3uzfg6632SXMWHgn4JeFOw1SLILbIncZmdNrYaDPZmlCaQWsM6i';
export const grant_type = 'client_credentials';
