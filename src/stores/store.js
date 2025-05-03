import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import itemReducer from "../reducers/ItemReducer";
import IPReducer from '../reducers/IPReducer';
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        item: itemReducer,
        geo: IPReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk)
});

export default store;