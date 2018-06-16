import React from 'react';
import { hydrate, render } from 'react-dom';
import { ClientApp } from './client';

const renderFunc = process.env.IS_DEV_SERVER ? render : hydrate;

renderFunc(<ClientApp/>, document.getElementById('root'));
