import { graphql, Link } from 'gatsby';
import React from 'react';

import { Banner } from '../components/banner';
import withLayout from '../components/layout';
import { showTiles } from '../components/tiles';
import { GraphQLNodes, ImageFile } from '../types';

interface IndexPageContent {
  banner: {
    headline: string;
    subheader: string;
    cta: string;
    image: ImageFile;
  };
}

interface SectionContent {
  id: string;
  teaser: {
    headline: string;
    copy: string;
    image: ImageFile;
  };
}

interface IndexPageData {
  fileQuery: GraphQLNodes<{
    childContentPages: IndexPageContent;
  }>;
  sectionsQuery: GraphQLNodes<{
    childContentSections: SectionContent;
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
  const sections = data.sectionsQuery.edges;
  return (
    <>
      <Banner banner={banner} />
      {showTiles(sections.map(({ node }) => ({
        ...node.childContentSections.teaser,
        key: node.childContentSections.id,
        url: '',
      })))}
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
        childContentPages {
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
  sectionsQuery: allFile(
    filter: {
      relativeDirectory: { eq: "sections" }
    }
  ) {
    edges {
      node {
        childContentSections {
          id
          teaser {
            headline
            copy
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
