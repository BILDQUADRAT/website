import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { Seo } from '../components/seo';
import { mapBlocks, Story } from '../util/storyblok';

export interface PageProps {
  story: Story;
}

const BlokPage = (props: PageProps) => (
  <>
    {props.story.content.seo && <Seo {...props.story.content.seo}/>}

    {mapBlocks(props.story.content.blocks)}

    <DummyContactForm/>
  </>
);

export default withLayout<PageProps>(BlokPage);
