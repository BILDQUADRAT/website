import React from 'react'
import { BlokData, mapBlocks, Story } from '../util/storyblok';
import withLayout from '../components/layout';

export interface PageProps {
  story: Story
}

const Page = (props: PageProps) => (
  <>
    {mapBlocks(props.story.content.blocks)}
  </>
);

export default withLayout<PageProps>(Page);
