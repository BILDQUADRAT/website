import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { safeLoad } from 'js-yaml';

import { setConfig, setCollections, setContent } from './store/actions';
import { getPageComponent } from './util/page-component';

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
        contentMap: PropTypes.shape({
            urls: PropTypes.array,
            collections: PropTypes.objectOf(PropTypes.array),
            pages: PropTypes.array,
        }),
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
        preloadedComponent: PropTypes.func,
        setCollections: PropTypes.func.isRequired,
        setConfig: PropTypes.func.isRequired,
        setContent: PropTypes.func.isRequired,
    }

    static defaultProps = {
        content: {},
        contentMap: {},
        location: {
            pathname: "",
        },
        preloadedComponent: null,
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
        if (this.props.preloadedComponent !== null) {
            return { element: this.props.preloadedComponent };
        }

        if (!('urls' in this.state.contentMap)) {
            return {};
        }

        const page = this.state.contentMap.urls[this.props.location.pathname];
        if (!page) {
            return {};
        }

        const componentPath = getPageComponent(page.path);
        if (window.BQ_CONTENT_COMPONENTS && componentPath in window.BQ_CONTENT_COMPONENTS) {
            return {
                element: window.BQ_CONTENT_COMPONENTS[pagePath],
                page,
            };
        }

        return { page };
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

        const props = { content: this.props.content };

        return React.createElement(this.state.pageElement, props);
    }
}
