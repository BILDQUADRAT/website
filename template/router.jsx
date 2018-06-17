import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { setConfig, setCollections } from './store';
import ExecutionEnvironment from 'exenv';

@connect(
    state => ({
        content: state.content,
    }),
    dispatch => ({
        setConfig: config => dispatch(setConfig(config)),
        setCollections: collections => dispatch(setCollections(collections)),
    })
)
export class TemplateRouter extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
        contentMap: PropTypes.object,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        setConfig: PropTypes.func.isRequired,
        setCollections: PropTypes.func.isRequired,
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
                    page
                };
            }
        }

        return {};

        // collections
    }

    async loadPageElement () {
        const { element, page } = this.pageElementFromCache();
        if (element) {
            this.setState({ pageElement: element });
            return;
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
