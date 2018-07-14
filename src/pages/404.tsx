import React, { Fragment } from 'react';

import withLayout from '../components/layout';

const NotFoundPage = () => (
  <>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
);

export default withLayout(NotFoundPage);
