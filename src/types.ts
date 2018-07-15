export interface GraphQLNodes<T> {
  edges: Array<{
    node: T;
  }>;
}
