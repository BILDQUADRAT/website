import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import '../styles/main.scss';

import { LayoutMetadata } from './__generated__/LayoutMetadata';
import { Footer } from './footer';
import Header from './header';

const render = (children: React.ReactNode) => (data: LayoutMetadata) => {
  if (!data || !data.site || !data.site.siteMetadata) {
    return null;
  }

  const title = data.site.siteMetadata!.title || '';

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Header siteTitle={title}/>

      {children}

      <Footer
        title={title}
        socialLinks={[ // todo(neolegends): Get this from storyblok's data sources
          { name: 'facebook', url: 'https://www.facebook.com/bildquadrat' },
          { name: 'twitter', url: 'https://twitter.com/bildquadrat' },
          { name: 'google-plus', url: 'https://plus.google.com/+BildquadratTv' },
          { name: 'vimeo', url: 'https://vimeo.com/bildquadrat' },
          { name: 'youtube', url: 'https://www.youtube.com/bildquadrat' },
        ]}
      />
    </>
  );
};

const LayoutComponent: React.SFC = ({ children }) => (
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

const withLayout = <P, _ = {}>(WrappedComponent: React.ComponentType<P>) => (props: P) => (
  <LayoutComponent>
    <WrappedComponent {...props} />
  </LayoutComponent>
);

export default withLayout;
