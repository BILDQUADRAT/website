import React from 'react';
import { renderToString } from 'react-dom/server';
import ejs from 'ejs';
import path from 'path';
import fsBase from 'fs';
import { StaticApp } from './template/static';
import store from './template/store';
const fs = fsBase.promises;

async function render() {
    // Render the component to a string
    const html = renderToString(
        <StaticApp/>
    );

    // prepare Redux preloaded state
    const preloadedState = store.getState();
    const scriptInsert = `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`;

    const template = (await fs.readFile(path.resolve(__dirname, './.tmp/index.html.ejs'))).toString();

    const output = ejs.render(template, {
        title: "BILDQUADRAT",
        html,
        scriptInsert,
    });

    await fs.writeFile(path.resolve(__dirname, './build/index.html'), output);
}

render().catch(e => { console.error(e); process.exit(1); });
