import React, { Component } from 'react';
import { safeLoad } from 'js-yaml';
import { setContent } from '../store';

export const ContentProvider = store => WrappedComponent => {
    class ContentProviderComponent extends Component {
        componentDidMount () {
            this.fetchContentForPage();
        }

        async fetchContentForPage () {
            const state = store.getState();
            if (Object.keys(state.content).length > 0) {
                return;
            }

            const url = 'pages/home';
            const pageRes = await fetch(`/content/${url}.yml`);
            if (!pageRes.ok) {
                return;
            }

            const page = safeLoad(await pageRes.text());
            store.dispatch(setContent(page));
        }

        render () {
            return (
                <WrappedComponent/>
            )
        }
    }

    return ContentProviderComponent;
}
