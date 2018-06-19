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

const SET_CONFIG = 'SET_CONFIG';
export function setConfig(config) {
    return {
        type: SET_CONFIG,
        payload: config,
    }
}

const SET_COLLECTIONS = 'SET_COLLECTIONS';
export function setCollections(collections) {
    return {
        type: SET_COLLECTIONS,
        payload: collections,
    }
}

export const Types = {
    SET_MENU_OPEN,
    SET_CONTENT,
    SET_CONFIG,
    SET_COLLECTIONS,
};
