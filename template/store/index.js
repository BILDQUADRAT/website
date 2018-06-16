import { createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import ExecutionEnvironment from 'exenv';

const SET_MENU_OPEN = 'SET_MENU_OPEN';
export function setMenuOpen(isOpen) {
    return {
        type: SET_MENU_OPEN,
        payload: isOpen,
    }
}

const SET_CONTENT = 'SET_CONTENT';
export function setContent(content) {
    return {
        type: SET_CONTENT,
        payload: content,
    }
}

export const initialState = {
    menuOpen: false,
    content: {},
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MENU_OPEN:
            return {
                ...state,
                menuOpen: action.payload,
            }
        case SET_CONTENT:
            return {
                ...state,
                content: action.payload,
            }
        default:
            return state;
    }
};


let preloadedState = undefined;
if (ExecutionEnvironment.canUseDOM && '__PRELOADED_STATE__' in window) {
    preloadedState = window.__PRELOADED_STATE__;
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;
}

export const store = createStore(
    reducer,
    preloadedState,
    compose(
        devToolsEnhancer({}),
    ),
);

export default store;
