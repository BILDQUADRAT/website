import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory, createMemoryHistory } from 'history';
import ExecutionEnvironment from 'exenv';

export const LocationContext = React.createContext({});
export const history = ExecutionEnvironment.canUseDOM ? createBrowserHistory() : createMemoryHistory();

export const LocationProvider = WrappedComponent => {
    class LocationProviderWrapper extends Component {
        static propTypes = {
            preloadedUrl: PropTypes.string,
        }

        static defaultProps = {
            preloadedUrl: null,
        }

        constructor(props) {
            super(props);

            if (props.preloadedUrl === null) {
                this.state = {
                    pathname: window.location.pathname || '',
                };

                history.listen((location, action) => {
                    this.setState({ pathname: location.pathname });
                });
            } else {
                this.state = {
                    pathname: props.preloadedUrl,
                };
            }
        }

        render () {
            return (
                <LocationContext.Provider value={this.state}>
                    <WrappedComponent />
                </LocationContext.Provider>
            )
        }
    }
    return LocationProviderWrapper;
}

export default LocationProvider;
