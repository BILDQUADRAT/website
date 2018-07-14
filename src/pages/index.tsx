import { graphql, Link } from 'gatsby';
import React from 'react';

import { Banner } from '../components/banner';
import withLayout from '../components/layout';

interface IndexPageContent {
  banner: {
    headline: string;
    subheader: string;
    cta: string;
    image: {
      publicURL: string;
    };
  };
}

interface IndexPageData {
  fileQuery: {
    edges: Array<{
      node: {
        childPagesYamlRel: IndexPageContent;
      };
    }>;
  };
}

interface IndexPageProps {
  data: IndexPageData;
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }: IndexPageProps) => {
  if (data.fileQuery.edges.length < 1) {
    return null;
  }
  const { banner } = data.fileQuery.edges[0].node.childPagesYamlRel;
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
        childPagesYamlRel {
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
