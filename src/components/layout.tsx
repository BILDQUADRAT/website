import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import '../styles/main.scss';

import { LayoutMetadata } from './__generated__/LayoutMetadata';
import { Footer, SocialMediaEntry } from './footer';
import Header from './header';
import { MenuItem } from './menu';

const render = (children: React.ReactNode) => (data: LayoutMetadata) => {
  if (
    !data || !data.site || !data.site.siteMetadata ||
    !data.allStoryblokDataSourceEntry
  ) {
    return null;
  }

  const title = data.site.siteMetadata!.title || '';
  const dataSourceEntries = data.allStoryblokDataSourceEntry.edges!
    .filter(node => node)
    .map(edge => edge!.node)
    .filter(node => node);

  const socialLinks: SocialMediaEntry[] = dataSourceEntries
    .filter(entry => entry!.data_source === 'social-links')
    .map(link => ({ name: link!.name!, url: link!.value! }));

  const menuItems: MenuItem[] = dataSourceEntries
    .filter(entry => entry!.data_source === 'main-menu')
    .map(link => ({ title: link!.name!, url: link!.value! }));

  return (
    <>
      <Header siteTitle={title} menuItems={menuItems} />

      {children}

      <Footer
        title={title}
        socialLinks={socialLinks}
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
      allStoryblokDataSourceEntry {
        edges {
          node {
            name,
            value,
            data_source
          }
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
