import { Link } from 'gatsby';
import * as React from 'react';
import Markdown from 'react-markdown';

import { mapBlocks, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

export interface ReferenceProps {
  customer: string;
  description: string;
  image: string;
  target: string;
  title: string;
}

export interface ReferencesProps {
  references: BlokData[];
}

export const Reference: React.SFC<ReferenceProps> = ({ customer, description, image, target, title }) => (
  <article className="reference">
    <div className="image">
      <StoryblokImage src={image} alt={title}/>
    </div>

    <Link to={target} className="inner">
      <header className="major">
        <h3>{title}</h3>
      </header>
      <p className="customer">{customer}</p>
      <Markdown className="description" source={description}/>
    </Link>
  </article>
);

export const References: React.SFC<ReferencesProps> = ({ references }) => (
  <section className="references">
    {mapBlocks(references)}
  </section>
);
