

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LayoutMetadata
// ====================================================

export interface LayoutMetadata_site_siteMetadata {
  title: string | null;
}

export interface LayoutMetadata_site {
  siteMetadata: LayoutMetadata_site_siteMetadata | null;
}

export interface LayoutMetadata_allStoryblokDataSourceMainMenu_edges_node {
  name: string | null;
  value: string | null;
}

export interface LayoutMetadata_allStoryblokDataSourceMainMenu_edges {
  /**
   * The item at the end of the edge
   */
  node: LayoutMetadata_allStoryblokDataSourceMainMenu_edges_node | null;
}

export interface LayoutMetadata_allStoryblokDataSourceMainMenu {
  /**
   * A list of edges.
   */
  edges: (LayoutMetadata_allStoryblokDataSourceMainMenu_edges | null)[] | null;
}

export interface LayoutMetadata_allStoryblokDataSourceSocialLinks_edges_node {
  name: string | null;
  value: string | null;
}

export interface LayoutMetadata_allStoryblokDataSourceSocialLinks_edges {
  /**
   * The item at the end of the edge
   */
  node: LayoutMetadata_allStoryblokDataSourceSocialLinks_edges_node | null;
}

export interface LayoutMetadata_allStoryblokDataSourceSocialLinks {
  /**
   * A list of edges.
   */
  edges: (LayoutMetadata_allStoryblokDataSourceSocialLinks_edges | null)[] | null;
}

export interface LayoutMetadata {
  site: LayoutMetadata_site | null;
  /**
   * Connection to all StoryblokDataSourceMainMenu nodes
   */
  allStoryblokDataSourceMainMenu: LayoutMetadata_allStoryblokDataSourceMainMenu | null;
  /**
   * Connection to all StoryblokDataSourceSocialLinks nodes
   */
  allStoryblokDataSourceSocialLinks: LayoutMetadata_allStoryblokDataSourceSocialLinks | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================