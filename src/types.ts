export interface GraphQLNodes<T> {
  edges: Array<{
    node: T;
  }>;
}

export interface StoryblokLink {
  cached_url: string;
  fieldtype: string;
  id: string;
  linktype: string;
  url: string;
}
