import React from 'react';
import Helmet from 'react-helmet';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { mapBlocks, Story } from '../util/storyblok';

export interface PageProps {
  story: Story;
}

const BlokPage = (props: PageProps) => (
  <>
    <Helmet>
      <title>{props.story.content.seo.title}</title>
      {props.story.content.seo.og_title &&
        <meta property="og:title" content={props.story.content.seo.og_title} />}
      {props.story.content.seo.og_image &&
        <meta property="og:image" content={props.story.content.seo.og_image} />}
      {props.story.content.seo.og_description &&
        <meta property="og:description" content={props.story.content.seo.og_description} />}
    </Helmet>

    {mapBlocks(props.story.content.blocks)}

    <DummyContactForm/>
  </>
);

export default withLayout<PageProps>(BlokPage);
