// This is a hack for local dev!

function loadAll(context, prefix = "") {
    return context.keys().reduce((pages, mod) => {
        const obj = context(mod);
        const path = prefix.concat(mod.replace(/^\.\//, '').replace(/\.jsx?$/, ''));
        pages[path] = obj.default;
        return pages;
    }, {})
}

window.BQ_CONTENT_COMPONENTS = window.BQ_CONTENT_COMPONENTS || {};

const reqCollections = require.context('./collections', false, /\.jsx?$/);
const reqPages = require.context('./pages', true, /\.jsx?$/);
window.BQ_CONTENT_COMPONENTS = loadAll(reqCollections, 'collections/').concat(loadAll(reqPages, 'pages/'));
