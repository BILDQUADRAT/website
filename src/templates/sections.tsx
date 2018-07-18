import { graphql } from 'gatsby';
import React from 'react';

import withLayout from '../components/layout';

import { SectionsData } from './__generated__/SectionsData';

interface SectionTemplateProps {
  data: SectionsData;
}

const SectionTemplate: React.SFC<SectionTemplateProps> = ({ data }: SectionTemplateProps) => {
  if (!data || !data.contentSections) {
    return null;
  }
  return (
    <h1>{data.contentSections.title}</h1>
  );
};

export const query = graphql`
  query SectionsData($id: String!) {
    contentSections(id: { eq: $id }) {
      title
      teaser {
        copy
        headline
      }
    }
  }
`;

export default withLayout(SectionTemplate);
