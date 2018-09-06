import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { mapBlocks, Story } from '../util/storyblok';

export interface GenericPageProps {
  story: Story;
}

const GenericPage = (props: GenericPageProps) => (
  <div id="main" className="alt">
    <section>
      <div className="inner">
        <header className="major">
          <h1>{props.story.content.title}</h1>
        </header>

        {mapBlocks(props.story.content.blocks)}
      </div>
    </section>

    <DummyContactForm/>
  </div>
);

export default withLayout<GenericPageProps>(GenericPage);
