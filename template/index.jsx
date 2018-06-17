import React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from './app';
import { ContentProvider } from './util/content-provider';
import store from './store';
import LocationProvider from './util/location-provider';

const renderFunc = process.env.IS_DEV_SERVER ? render : hydrate;

const ClientApp = LocationProvider(ContentProvider(store)(App));

renderFunc(<ClientApp/>, document.getElementById('root'));
