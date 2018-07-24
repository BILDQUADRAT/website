import { graphql } from 'gatsby';
import { optional } from "optional-chain";
import React from 'react';

import { Banner } from '../components/banner';
import withLayout from '../components/layout';
import { showTiles } from '../components/tiles';

import { IndexData, IndexData_fileQuery_edges_node_childContentPages_tiles } from './__generated__/IndexData';

interface IndexPageProps {
  data: IndexData;
}

const IndexPage: React.SFC<IndexPageProps> = ({ data }: IndexPageProps) => {
  const content = optional(data).k('fileQuery').k('edges').i(0).k('node').k('childContentPages').get();
  if (!content) {
    return null;
  }
  const { banner, tiles } = content;
  return (
    <>
      {banner && <Banner banner={banner} />}
      {showTiles(tiles.map((tile: IndexData_fileQuery_edges_node_childContentPages_tiles) => ({
        headline: tile.title,
        copy: tile.teaser,
        image: tile.image,
        key: tile.title,
        url: '',
      })))}
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
              ...DefaultImageLarge
            }
          }
          tiles {
            title
            teaser
            image {
              ...DefaultImageLarge
            }
          }
        }
      }
    }
  }
}
`;

export default withLayout(IndexPage);
