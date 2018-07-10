import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory, createMemoryHistory } from 'history';
import ExecutionEnvironment from 'exenv';

export const LocationContext = React.createContext({});
export const history = ExecutionEnvironment.canUseDOM ? createBrowserHistory() : createMemoryHistory();

if (ExecutionEnvironment.canUseDOM) {
    window.reactHistory = window.reactHistory || history;
}

export const LocationProvider = WrappedComponent => {
    class LocationProviderWrapper extends Component {
        static propTypes = {
            preloadedUrl: PropTypes.string,
            preloadedComponent: PropTypes.func,
        }

        static defaultProps = {
            preloadedUrl: null,
            preloadedComponent: null,
        }

        constructor(props) {
            super(props);

            if (props.preloadedUrl === null) {
                this.state = {
                    pathname: window.location.pathname || '',
                };
            } else {
                this.state = {
                    pathname: props.preloadedUrl,
                };
            }
        }

        componentDidMount () {
            history.listen((location, action) => {
                this.setState({ pathname: location.pathname });
            });
        }

        render () {
            return (
                <LocationContext.Provider value={{ location: this.state, preloadedComponent: this.props.preloadedComponent }}>
                    <WrappedComponent />
                </LocationContext.Provider>
            )
        }
    }
    return LocationProviderWrapper;
}

export default LocationProvider;
