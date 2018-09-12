import React from 'react';
import Helmet from 'react-helmet';

import { DummyContactForm } from '../components/contact';
import withLayout from '../components/layout';
import { mapBlocks, Story } from '../util/storyblok';

export interface GenericPageProps {
  story: Story;
}

const GenericPage = (props: GenericPageProps) => (
  <main className="alt">
    <Helmet>
      <title>{props.story.content.seo.title}</title>
      {props.story.content.seo.og_title &&
        <meta property="og:title" content={props.story.content.seo.og_title} />}
      {props.story.content.seo.og_image &&
        <meta property="og:image" content={props.story.content.seo.og_image} />}
      {props.story.content.seo.og_description &&
        <meta property="og:description" content={props.story.content.seo.og_description} />}
    </Helmet>

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
