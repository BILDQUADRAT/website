export interface ImageFile {
  publicURL: string;
}

export interface GraphQLNodes<T> {
  edges: Array<{
    node: T;
  }>;
}
