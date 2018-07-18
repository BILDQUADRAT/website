import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import '../styles/main.scss';

import { LayoutMetadata } from './__generated__/LayoutMetadata';
import Header from './header';

interface LayoutProps {
}

const render = (children: React.ReactNode) => (data: LayoutMetadata) => (
  <>
    <Helmet
      title={data.site!.siteMetadata!.title || ''}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site!.siteMetadata!.title || ''} />
    {children}
  </>
);

const LayoutComponent: React.SFC<LayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
    query LayoutMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
    `}
    render={render(children)}
  />
);

const withLayout = <P, _>(WrappedComponent: React.ComponentType<P>) => (props: P) => (
  <LayoutComponent>
    <WrappedComponent {...props} />
  </LayoutComponent>
);

export default withLayout;
