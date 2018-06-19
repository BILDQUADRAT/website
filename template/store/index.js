import { createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import ExecutionEnvironment from 'exenv';

import { Types } from './actions';

export const initialState = {
    menuOpen: false,
    content: {},
    config: {},
    collections: {},
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Types.SET_MENU_OPEN:
            return {
                ...state,
                menuOpen: action.payload,
            }
        case Types.SET_CONTENT:
            return {
                ...state,
                content: action.payload,
            }
        case Types.SET_CONFIG:
            return {
                ...state,
                config: action.payload,
            }
        case Types.SET_COLLECTIONS:
            return {
                ...state,
                collections: action.payload,
            }
        default:
            return state;
    }
};


let preloadedState = undefined;
if (ExecutionEnvironment.canUseDOM && '__PRELOADED_STATE__' in window) {
    preloadedState = window.__PRELOADED_STATE__;
}

export const store = createStore(
    reducer,
    preloadedState,
    compose(
        devToolsEnhancer({}),
    ),
);

export default store;
