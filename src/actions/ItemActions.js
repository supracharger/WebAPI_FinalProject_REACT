import actionTypes from '../constants/actionTypes';
//import runtimeEnv from '@mars/heroku-js-runtime-env'
const env = process.env;

function itemsFetched(items) {
    return {
        type: actionTypes.FETCH_ITEMS,
        items: items
    }
}

function addItem(item){
    return {
        type: actionTypes.ADD_ITEM,
        item: item
    }
}

export function itemAdd(item){
    return dispatch => {
        dispatch(addItem(item));
    }
}

export function fetchItems() {
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/items`, {
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
            return response.json()
        }).then((res) => {
            dispatch(itemsFetched(res));
        }).catch((e) => console.log(e));
    }
}