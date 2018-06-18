import fsm from 'fs';
import path from 'path';
import { safeLoad as loadYaml } from 'js-yaml';
import slugify from 'slugify';
import readdirRecursive from 'recursive-readdir';
import flatten from 'array-flatten';
const fs = fsm.promises;

const rootPath = (filepath = "") => path.resolve(__dirname, path.join('../..', filepath));
const contentPath = (filepath = "") => path.resolve(__dirname, path.join('../../content', filepath));
const templatePath = (filepath = "") => path.resolve(__dirname, path.join('..', filepath));

async function loadYamlFile(filepath) {
    const content = await fs.readFile(filepath, 'utf-8');
    return loadYaml(content);
}

async function loadContentFile(filepath) {
    return loadYamlFile(contentPath(filepath));
}

function makeUrl(page, filePath, col = null) {
    const baseUrl = page.url || page.slug || (page.title ? slugify(page.title) : filePath.substr(0, -4));

    return path.normalize(path.join(
        '/',
        col ? (col.url || col.name) : '',
        baseUrl,
    ));
}

async function getCollections() {
    const cmsConfig = await loadYamlFile(templatePath('cms.yml'));
    const collections = cmsConfig.collections.filter(coll => !!coll.folder);

    const pages = await Promise.all(collections.map(async col => {
        const files = (await fs.readdir(rootPath(col.folder), 'utf-8')).filter(file => file.endsWith('.yml'));
        return Promise.all(files.map(async filePath => {
            const fullPath = path.join(col.folder, filePath);
            const fileContent = await loadYamlFile(rootPath(fullPath));
            const url = makeUrl(fileContent, filePath, col);
            return {
                url,
                path: fullPath,
                content: fileContent,
            };
        }));
    }));

    return pages.reduce((entries, colFiles, key) => {
        entries[collections[key].name] = colFiles;
        return entries;
    }, {});
}

async function getPages() {
    // fetch recursive
    const pagesPaths = (await readdirRecursive(contentPath('pages'))).filter(p => p.endsWith('.yml'));

    const pages = await Promise.all(pagesPaths.map(async fullPath => {
        const pagePath = path.relative(contentPath(), fullPath);
        const fileContent = await loadYamlFile(fullPath);
        const url = makeUrl(fileContent, pagePath);
        return {
            url,
            path: pagePath,
            content: fileContent,
        }
    }));

    return pages;
}

export async function getContentMap() {
    const collections = await getCollections();
    const pages = await getPages();

    const urls = flatten([Object.values(collections), pages]).reduce((urls, page) => {
        urls[page.url] = page;
        return urls;
    }, {});

    let config = {};
    try {
        config = (await loadContentFile('site.yml')) || {};
    } catch(e) {}

    return {
        collections: collections,
        pages: pages,
        config,
        urls,
    };
}

if (require.main === module) {
    getContentMap().then(console.log).catch(e => { console.error(e); process.exit(1); });
}
