import CMS from 'netlify-cms';
import netlifyIdentity from 'netlify-identity-widget';

import HomePage from './pages/home';
import PreviewProvider from './util/preview-provider';

window.netlifyIdentity = netlifyIdentity;
netlifyIdentity.init();

CMS.registerPreviewStyle('/cms/site.css');
CMS.registerPreviewTemplate('home', PreviewProvider(HomePage))
