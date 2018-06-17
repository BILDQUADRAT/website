// This is a hack for local dev!

function loadAll(context) {
    return context.keys().reduce((pages, mod) => {
        const obj = context(mod);
        const path = mod.replace(/^\.\//, '').replace(/\.jsx?$/, '');
        pages[path] = obj.default;
        return pages;
    }, {})
}

window.BQ_CONTENT_COMPONENTS = window.BQ_CONTENT_COMPONENTS || {};

const reqPages = require.context('./pages', true, /\.jsx?$/);
window.BQ_CONTENT_COMPONENTS.pages = loadAll(reqPages);

const reqCollections = require.context('./collections', false, /\.jsx?$/);
window.BQ_CONTENT_COMPONENTS.collections = loadAll(reqCollections);
