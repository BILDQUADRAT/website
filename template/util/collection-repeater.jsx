import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/lib/connect/connect';

@connect(
    (state, ownProps) => ({
        collections: state.collections && ownProps.name && ownProps.name in state.collections
            ? state.collections[ownProps.name] : []
    }),
)
export class CollectionRepeater extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired,
        collections: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            content: PropTypes.object,
        })),
    }

    getKeyForPage (page) {
        const urlParts = page.url.split('/');
        return urlParts[urlParts.length-1] || 'index';
    }

    render () {
        if (!this.props.collections) {
            return null;
        }

        return this.props.collections.map(page => {
            const key = this.getKeyForPage(page);
            return this.props.children(page, key);
        });
    }
}

export default CollectionRepeater;
