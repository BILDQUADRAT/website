import React from 'react';
import { renderToString } from 'react-dom/server';
import ejs from 'ejs';
import path from 'path';
import fsBase from 'fs';
import { safeLoad } from 'js-yaml';
import { ensureDir } from 'fs-extra';

import store from './template/store';
import { setContent } from './template/store/actions';
import { App } from './template/app';
import { getContentMap } from './template/util/collect-content';
import LocationProvider from './template/util/location-provider';

const fs = fsBase.promises;

const ServerApp = LocationProvider(App);

const rootPath = (filepath = "") => path.resolve(__dirname, filepath);
const buildPath = (filepath = "") => rootPath(path.join('build', filepath));
const contentPath = (filepath = "") => rootPath(path.join('content', filepath));

class StaticRenderer {
    async getContentForPage(page) {
        const pageDef = await fs.readFile(contentPath(page), 'utf-8');
        return safeLoad(pageDef);
    }

    async renderSinglePage({ url, path: filepath, content }) {
        store.dispatch(setContent(content));

        const html = renderToString(
            <ServerApp preloadedUrl={url} />
        );

        // prepare Redux preloaded state
        const preloadedState = store.getState();
        const scriptInsert = `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`;

        const template = await fs.readFile(rootPath('.tmp/index.html.ejs'), 'utf-8');

        const output = ejs.render(template, {
            title: "BILDQUADRAT",
            html,
            scriptInsert,
        });

        await ensureDir(buildPath(url));
        await fs.writeFile(buildPath(path.join(url, 'index.html')), output);
    }

    async init() {
        this.contentMap = await getContentMap();
    }

    async render() {
        await this.init();

        for (const collection of Object.values(this.contentMap.collections)) {
            for (const page of collection) {
                await this.renderSinglePage(page);
            }
        }

        for (const page of this.contentMap.pages) {
            await this.renderSinglePage(page);
        }

        await fs.writeFile(buildPath('content.json'), JSON.stringify(this.contentMap));
    }
}

new StaticRenderer().render().catch(e => { console.error(e); process.exit(1); });
