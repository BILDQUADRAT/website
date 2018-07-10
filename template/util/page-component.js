export function getPageComponent (path) {
    const parts = path.split('/');
    if (parts[0] === 'pages') {
        return 'pages/'.concat(parts.slice(1).join('/').replace(/\.yml$/, ''));
    }

    if (parts[0] !== 'pages') {
        return 'collections/'.concat(parts[0]);
    }

    return false;
}