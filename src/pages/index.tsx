import { graphql } from 'gatsby';
import React from 'react';

import { Banner } from '../components/banner';
import withLayout from '../components/layout';
import { showTiles, TileProps } from '../components/tiles';

import { IndexData } from './__generated__/IndexData';

interface IndexPageProps {
  data: IndexData;
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }: IndexPageProps) => {
  if (data.fileQuery!.edges!.length < 1) {
    return null;
  }
  const { banner } = data.fileQuery!.edges![0]!.node!.childContentPages!;
  const sections = data.sectionsQuery!.edges;
  return (
    <>
      {banner && <Banner banner={banner} />}
      {showTiles(sections!.map((edge): TileProps => {
        const { node } = edge!;
        // tslint:disable:no-object-literal-type-assertion
        return {
          ...node!.childContentSections!.teaser!,
          key: node!.childContentSections!.id,
          url: node!.childContentSections!.fields!.url,
        } as TileProps;
      }))}
    </>
  );
};

export const query = graphql`
query IndexData {
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
              childImageSharp {
                sqip(numberOfPrimitives: 20) {
                  dataURI
                }
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
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
              childImageSharp {
                sqip(numberOfPrimitives: 10) {
                  dataURI
                }
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            url
          }
        }
      }
    }
  }
}
`;

export default withLayout(IndexPage);
