import React from 'react';
import Helmet from "react-helmet";

const MetaTags = ({ children }) => (
  <Helmet titleTemplate="%s | BILDQUADRAT" defaultTitle="BILDQUADRAT">
    {children}
  </Helmet>
);

export default MetaTags;
