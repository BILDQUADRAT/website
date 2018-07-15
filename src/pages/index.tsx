import { graphql, Link } from 'gatsby';
import React from 'react';

import { Banner } from '../components/banner';
import withLayout from '../components/layout';
import { GraphQLNodes, ImageFile } from '../types';

interface IndexPageContent {
  banner: {
    headline: string;
    subheader: string;
    cta: string;
    image: ImageFile;
  };
}

interface IndexPageData {
  fileQuery: GraphQLNodes<{
    childContentPages: IndexPageContent;
  }>;
}

interface IndexPageProps {
  data: IndexPageData;
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }: IndexPageProps) => {
  if (data.fileQuery.edges.length < 1) {
    return null;
  }
  const { banner } = data.fileQuery.edges[0].node.childContentPages;
  return (
    <>
      {<Banner banner={banner} />}
    </>
  );
};

export const query = graphql`
{
	fileQuery: allFile(
    limit: 1,
    filter: {
      relativeDirectory: { eq: "pages" }
      name: { eq: "home" }
    }
  ) {
    edges {
      node {
        name
        childContentPages {
          title
          banner {
            headline
            subheader
            cta
            image {
              publicURL
            }
          }
        }
      }
    }
  }
}
`;

export default withLayout(IndexPage);
