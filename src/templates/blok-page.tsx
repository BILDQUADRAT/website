import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { Seo } from '../components/seo';
import { mapBlocks, Story } from '../util/storyblok';
import MetaTags from '../util/meta';

export interface PageProps {
  story: Story;
}

const BlokPage = (props: PageProps) => (
  <>
    <MetaTags>
      <title>{props.story.name}</title>
      <meta property="og:title" content={props.story.name}/>
    </MetaTags>
    {props.story.content.seo && <Seo {...props.story.content.seo}/>}

    {mapBlocks(props.story.content.blocks)}

    <DummyContactForm/>
  </>
);

export default withLayout<PageProps>(BlokPage);
