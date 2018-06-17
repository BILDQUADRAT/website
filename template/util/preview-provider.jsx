import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const PreviewProvider = WrappedComponent => {
    class PreviewProviderWrapper extends Component {
        static propTypes = {
            entry: PropTypes.object,
        }

        componentDidMount () {
            console.log(this.props);
        }

        render () {
            if (!this.props.entry) {
                return null;
            }

            const content = this.props.entry.get('data').toObject();
            return <WrappedComponent content={content} />;
        }
    }

    return PreviewProviderWrapper;
}

export default PreviewProvider;
