import { Link } from 'gatsby';
import React from 'react';
import Markdown from 'react-markdown';

import { mapBlock, BlokData } from '../util/storyblok';

export interface FeatureProps {
  image: string;
  title: string;
  copy: string;
  buttons: BlokData[];
  orientation: 'forward' | 'reverse' | '';
}
export interface FeaturesAlternatingProps {
  items: BlokData[];
}

export const Feature: React.SFC<FeatureProps> = ({ orientation, image, title, copy, buttons }) => (
  <section className={`feature ${orientation || ''}`}>
    <Link to="" className="image" style={{ backgroundImage: `url(${image})` }} />
    <div className="content">
      <div className="inner">
        <header className="major">
          <h3>{title}</h3>
        </header>
        <p><Markdown source={copy} /></p>
        <ul className="actions">
          {buttons.map((blok: BlokData) => (
            <li key={blok._uid}>
              {mapBlock(blok)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export const FeaturesAlternating: React.SFC<FeaturesAlternatingProps> = ({ items }) => (
  <>
    {items.map((blok, i) => mapBlock(blok, { orientation: i % 2 === 0 ? 'forward' : 'reverse' }))}
  </>
);
