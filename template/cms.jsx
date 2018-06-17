import React from 'react';
import CMS from 'netlify-cms';
import netlifyIdentity from 'netlify-identity-widget';
import PreviewProvider from './util/preview-provider';
import HomePage from './pages/home';

netlifyIdentity.init();

CMS.registerPreviewStyle('/cms/site.css');
CMS.registerPreviewTemplate('home', PreviewProvider(HomePage))
