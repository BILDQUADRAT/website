

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DefaultImageLarge
// ====================================================

export interface DefaultImageLarge_childImageSharp_sqip {
  dataURI: string | null;
}

export interface DefaultImageLarge_childImageSharp_fluid {
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
}

export interface DefaultImageLarge_childImageSharp {
  sqip: DefaultImageLarge_childImageSharp_sqip | null;
  fluid: DefaultImageLarge_childImageSharp_fluid | null;
}

export interface DefaultImageLarge {
  /**
   * The child of this node of type imageSharp
   */
  childImageSharp: DefaultImageLarge_childImageSharp | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================