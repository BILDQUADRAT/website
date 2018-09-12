import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { Seo } from '../components/seo';
import { mapBlocks, Story } from '../util/storyblok';

export interface GenericPageProps {
  story: Story;
}

const GenericPage = (props: GenericPageProps) => (
  <main className="alt">
    {props.story.content.seo && <Seo {...props.story.content.seo}/>}

    <section>
      <div className="inner">
        <header className="major">
          <h1>{props.story.content.title}</h1>
        </header>

        {mapBlocks(props.story.content.blocks)}
      </div>
    </section>

    <DummyContactForm/>
  </main>
);

export default withLayout<GenericPageProps>(GenericPage);
