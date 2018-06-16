import React, { Component } from 'react';
import { Provider } from 'react-redux';
import HomePage from './pages/home';
import store from './store';

export class ClientApp extends Component {
    render () {
        return (
            <Provider store={store}>
                <HomePage />
                {/* will need to determine current page here. some kind of routing required */}
            </Provider>
        )
    }
}
