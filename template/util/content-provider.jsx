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

            const pageName = 'home';
            const pageDef = await (await fetch(`/content/pages/${pageName}.yml`)).text();
            const page = safeLoad(pageDef);
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
