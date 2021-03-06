import { Link } from 'gatsby';
import * as React from 'react';
import Markdown from 'react-markdown';

import { mapBlocks, BlokData, StoryblokLink } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

export interface ReferenceProps {
  customer: string;
  description: string;
  image: string;
  target: StoryblokLink;
  title: string;
}

export interface ReferencesProps {
  references: BlokData[];
}

export const Reference: React.SFC<ReferenceProps> = ({ customer, description, image, target, title }) => (
  <article className="reference">
    <Link to={target.cached_url}>
      <div className="image">
        <StoryblokImage src={image} alt={title}/>
      </div>

      <div className="inner">
        <header className="major">
          <h3>{title}</h3>
        </header>
        <p className="customer">{customer}</p>
        <Markdown className="description" source={description}/>
      </div>
    </Link>
  </article>
);

export const References: React.SFC<ReferencesProps> = ({ references }) => (
  <section className="references">
    {mapBlocks(references)}
  </section>
);
