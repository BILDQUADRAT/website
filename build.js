import React from 'react';
import { renderToString } from 'react-dom/server';
import ejs from 'ejs';
import path from 'path';
import fsBase from 'fs';
import { safeLoad } from 'js-yaml';

import store, { setContent } from './template/store';
import { App } from './template/app';

const fs = fsBase.promises;

class StaticRenderer {
    async getContentForPage(page) {
        const pagePath = path.resolve(__dirname, `./content/pages/${page}.yml`);
        const pageDef = await fs.readFile(pagePath, 'utf-8');
        return safeLoad(pageDef);
    }

    async render() {
        // Load content
        const content = await this.getContentForPage('home');
        store.dispatch(setContent(content));

        // Render the component to a string
        const html = renderToString(
            <App/>
        );

        // prepare Redux preloaded state
        const preloadedState = store.getState();
        const scriptInsert = `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`;

        const template = await fs.readFile(path.resolve(__dirname, './.tmp/index.html.ejs'), 'utf-8');

        const output = ejs.render(template, {
            title: "BILDQUADRAT",
            html,
            scriptInsert,
        });

        await fs.writeFile(path.resolve(__dirname, './build/index.html'), output);
    }
}

new StaticRenderer().render().catch(e => { console.error(e); process.exit(1); });
