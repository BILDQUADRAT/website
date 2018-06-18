import React from 'react';
import { hydrate, render } from 'react-dom';
import { App } from './app';
import LocationProvider from './util/location-provider';

const renderFunc = process.env.IS_DEV_SERVER ? render : hydrate;

const ClientApp = LocationProvider(App);

renderFunc(<ClientApp/>, document.getElementById('root'));
