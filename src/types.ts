import { GatsbyImageProps } from 'gatsby-image';

export interface ImageFile {
  publicURL: string;
}

export interface GraphQLNodes<T> {
  edges: Array<{
    node: T;
  }>;
}

export interface SharpFluidImage {
  childImageSharp: {
    fluid: GatsbyImageProps;
  };
}
