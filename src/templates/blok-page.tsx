import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { mapBlocks, Story } from '../util/storyblok';

export interface PageProps {
  story: Story;
}

const Page = (props: PageProps) => (
  <>
    {mapBlocks(props.story.content.blocks)}

    <DummyContactForm/>
  </>
);

export default withLayout<PageProps>(Page);
