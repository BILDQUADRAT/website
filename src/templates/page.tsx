import React from 'react';

import withLayout from '../components/layout';
import { mapBlocks, Story } from '../util/storyblok';

export interface PageProps {
  story: Story;
}

const Page = (props: PageProps) => (
  <>
    {mapBlocks(props.story.content.blocks)}
  </>
);

export default withLayout<PageProps>(Page);
