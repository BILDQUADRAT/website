

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

export interface LayoutMetadata_allStoryblokDataSourceEntry_edges_node {
  name: string | null;
  value: string | null;
  data_source: string | null;
}

export interface LayoutMetadata_allStoryblokDataSourceEntry_edges {
  /**
   * The item at the end of the edge
   */
  node: LayoutMetadata_allStoryblokDataSourceEntry_edges_node | null;
}

export interface LayoutMetadata_allStoryblokDataSourceEntry {
  /**
   * A list of edges.
   */
  edges: (LayoutMetadata_allStoryblokDataSourceEntry_edges | null)[] | null;
}

export interface LayoutMetadata {
  site: LayoutMetadata_site | null;
  /**
   * Connection to all StoryblokDataSourceEntry nodes
   */
  allStoryblokDataSourceEntry: LayoutMetadata_allStoryblokDataSourceEntry | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================