

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

export interface IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp_sqip {
  dataURI: string | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp {
  sqip: IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp_sqip | null;
  fluid: IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp_fluid | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_tiles_image {
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: IndexData_fileQuery_edges_node_childContentPages_tiles_image_childImageSharp | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages_tiles {
  title: string | null;
  teaser: string | null;
  image: IndexData_fileQuery_edges_node_childContentPages_tiles_image | null;
}

export interface IndexData_fileQuery_edges_node_childContentPages {
  banner: IndexData_fileQuery_edges_node_childContentPages_banner | null;
  tiles: (IndexData_fileQuery_edges_node_childContentPages_tiles | null)[] | null;
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

export interface IndexData {
  /**
   * Connection to all File nodes
   */
  fileQuery: IndexData_fileQuery | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================