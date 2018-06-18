import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { safeLoad } from 'js-yaml';

import { setConfig, setCollections, setContent } from './store';

@connect(
    state => ({
        content: state.content,
    }),
    dispatch => ({
        setCollections: collections => dispatch(setCollections(collections)),
        setConfig: config => dispatch(setConfig(config)),
        setContent: content => dispatch(setContent(content)),
    })
)
export class TemplateRouter extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        contentMap: PropTypes.object,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        setCollections: PropTypes.func.isRequired,
        setConfig: PropTypes.func.isRequired,
        setContent: PropTypes.func.isRequired,
    }

    constructor (props) {
        super(props);

        this.state = {
            contentMap: props.contentMap || {},
            pageElement: null,
        }

        const pageElementPreload = this.pageElementFromCache().element;
        if (pageElementPreload !== null) {
            this.state.pageElement = pageElementPreload;
        }
    }

    componentDidMount () {
        this.fetchContentMap();
    }

    async fetchContentMap () {
        const urlMap = await fetch('/content.json');
        if (!urlMap.ok) {
            throw new Error("Fetching URL map failed");
        }

        const contentMap = await urlMap.json();
        this.setState({ contentMap });
        this.props.setConfig(contentMap.config);
        this.props.setCollections(contentMap.collections);
    }

    pageElementFromCache () {
        if (!('urls' in this.state.contentMap)) {
            return {};
        }

        const page = this.state.contentMap.urls[this.props.location.pathname];
        if (!page || !window.BQ_CONTENT_COMPONENTS) {
            return {};
        }

        const parts = page.path.split('/');
        if (parts[0] === 'pages' && window.BQ_CONTENT_COMPONENTS.pages) {
            const pagePath = parts.slice(1).join('/').replace(/\.yml$/, '');
            if (pagePath in window.BQ_CONTENT_COMPONENTS.pages) {
                return {
                    element: window.BQ_CONTENT_COMPONENTS.pages[pagePath],
                    page,
                };
            }
        }

        if (parts[0] !== 'pages' && window.BQ_CONTENT_COMPONENTS.collections) {
            if (parts[0] in window.BQ_CONTENT_COMPONENTS.collections) {
                return {
                    element: window.BQ_CONTENT_COMPONENTS.collections[parts[0]],
                    page,
                }
            }
        }

        return {};
    }

    async loadPageElement () {
        const { element, page } = this.pageElementFromCache();
        if (element) {
            this.setState({ pageElement: element });
        }

        if (page) {
            if (page.content) {
                this.props.setContent(page.content);
            } else {
                const contentRes = await fetch(`/content/${page.path}`);
                if (contentRes.ok) {
                    this.props.setContent(safeLoad(await contentRes.text()));
                }
            }
        }

        //const element = await import()
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.contentMap !== this.state.contentMap || prevProps.location.pathname !== this.props.location.pathname) {
            this.loadPageElement();
        }
    }

    componentWillUnmount () {
        if (this.unlistenHistory) {
            this.unlistenHistory();
        }
    }

    render () {
        if (!Object.keys(this.props.content).length || !this.state.pageElement) {
            return null;
        }

        return React.createElement(this.state.pageElement, { content: this.props.content });
    }
}
