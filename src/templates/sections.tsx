import { graphql } from 'gatsby';
import React from 'react';

import withLayout from '../components/layout';

interface SectionData {
  contentSections: {
    title: string;
    teaser: {
      copy: string;
      headline: string;
    };
  };
}

interface SectionTemplateProps {
  data: SectionData;
}

const SectionTemplate: React.SFC<SectionTemplateProps> = ({ data }: SectionTemplateProps) => (
  <h1>{data.contentSections.title}</h1>
);

export const query = graphql`
  query($id: String!) {
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
