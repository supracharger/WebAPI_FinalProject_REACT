import actionTypes from '../constants/actionTypes';
//import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

function GeoFetched(data) {
    return {
        type: actionTypes.FETCH_GEO,
        data: data
    }
}

export function fetchIP(ip) {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/geo/${ip}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            var body = response.json();
            return body;
        }).then((res) => {
            dispatch(GeoFetched(res));
        }).catch((e) => console.log(e));
    }
}