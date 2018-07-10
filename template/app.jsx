import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import netlifyIdentity from 'netlify-identity-widget';
import { TemplateRouter } from './router';
import { LocationContext } from './util/location-provider';

export class App extends Component {
    componentDidMount () {
        netlifyIdentity.on("init", user => {
            if (!!user) {
                return;
            }

            netlifyIdentity.on("login", () => {
                window.location.href = '/cms/';
            });
        });
        netlifyIdentity.init();
    }

    render () {
        return (
            <Provider store={store}>
                <LocationContext.Consumer>
                    {({location, preloadedComponent}) => (
                        <TemplateRouter {...this.props} location={location} preloadedComponent={preloadedComponent} />
                    )}
                </LocationContext.Consumer>
            </Provider>
        )
    }
}
