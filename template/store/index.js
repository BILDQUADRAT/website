import { createStore, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const SET_MENU_OPEN = 'SET_MENU_OPEN';
export function setMenuOpen(isOpen) {
    return {
        type: SET_MENU_OPEN,
        payload: isOpen,
    }
}

export const initialState = {
    menuOpen: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MENU_OPEN:
            return {
                ...state,
                menuOpen: action.payload,
            }
        default:
            return state;
    }
};

export const store = createStore(
    reducer,
    compose(
        devToolsEnhancer({}),
    ),
);

export default store;
