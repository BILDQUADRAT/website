import React from 'react';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { Seo } from '../components/seo';
import { mapBlocks, Story } from '../util/storyblok';
import MetaTags from '../util/meta';

export interface GenericPageProps {
  story: Story;
}

const GenericPage = (props: GenericPageProps) => (
  <main className="alt">
    <MetaTags>
      {props.story.content.title && (
        <>
          <title>{props.story.content.title}</title>
          <meta property="og:title" content={props.story.content.title}/>
        </>
      )}
    </MetaTags>
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
