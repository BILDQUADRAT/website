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
    !data.allStoryblokDataSourceSocialLinks ||
    !data.allStoryblokDataSourceMainMenu
  ) {
    return null;
  }

  const title = data.site.siteMetadata!.title || '';
  const socialLinks: SocialMediaEntry[] = data.allStoryblokDataSourceSocialLinks.edges!
    .filter(link => link)
    .map(link => ({name: link!.node!.name!, url: link!.node!.value!}));

  const menuItems: MenuItem[] = data.allStoryblokDataSourceMainMenu.edges!
    .filter(item => item)
    .map(link => ({title: link!.node!.name!, url: link!.node!.value!}));

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
      allStoryblokDataSourceMainMenu {
        edges {
          node {
            name,
            value
          }
        }
      }
      allStoryblokDataSourceSocialLinks {
        edges {
          node {
            name,
            value
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
