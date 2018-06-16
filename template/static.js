import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/home';

export const StaticApp = () => (
    <Provider store={store}>
        <HomePage/>
        {/* we'll pass in the current page component here most likely */}
    </Provider>
);

export default StaticApp;
