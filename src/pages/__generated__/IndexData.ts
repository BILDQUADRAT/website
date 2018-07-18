

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndexData
// ====================================================

export interface IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp_sqip {
  dataURI: string | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp {
  sqip: IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp_sqip | null;
  fluid: IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp_fluid | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_banner_image {
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: IndexData_fileQuery_edges_node_childContentPages_banner_image_childImageSharp | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_banner {
  headline: string | null;
  subheader: string | null;
  cta: string | null;
  image: IndexData_fileQuery_edges_node_childContentPages_banner_image | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages {
  banner: IndexData_fileQuery_edges_node_childContentPages_banner | null;
}

export interface IndexData_fileQuery_edges_node {
  /**
   * The child of this node of type contentPages
   */
  childContentPages: IndexData_fileQuery_edges_node_childContentPages | null;
}

export interface IndexData_fileQuery_edges {
  /**
   * The item at the end of the edge
   */
  node: IndexData_fileQuery_edges_node | null;
}

export interface IndexData_fileQuery {
  /**
   * A list of edges.
   */
  edges: (IndexData_fileQuery_edges | null)[] | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp_sqip {
  dataURI: string | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp {
  sqip: IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp_sqip | null;
  fluid: IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp_fluid | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_teaser_image {
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: IndexData_sectionsQuery_edges_node_childContentSections_teaser_image_childImageSharp | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_teaser {
  headline: string | null;
  copy: string | null;
  image: IndexData_sectionsQuery_edges_node_childContentSections_teaser_image | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections_fields {
  url: string | null;
}

export interface IndexData_sectionsQuery_edges_node_childContentSections {
  /**
   * The id of this node.
   */
  id: string;
  teaser: IndexData_sectionsQuery_edges_node_childContentSections_teaser | null;
  fields: IndexData_sectionsQuery_edges_node_childContentSections_fields | null;
}

export interface IndexData_sectionsQuery_edges_node {
  /**
   * The child of this node of type contentSections
   */
  childContentSections: IndexData_sectionsQuery_edges_node_childContentSections | null;
}

export interface IndexData_sectionsQuery_edges {
  /**
   * The item at the end of the edge
   */
  node: IndexData_sectionsQuery_edges_node | null;
}

export interface IndexData_sectionsQuery {
  /**
   * A list of edges.
   */
  edges: (IndexData_sectionsQuery_edges | null)[] | null;
}

export interface IndexData {
  /**
   * Connection to all File nodes
   */
  fileQuery: IndexData_fileQuery | null;
  /**
   * Connection to all File nodes
   */
  sectionsQuery: IndexData_sectionsQuery | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================