import { Link } from 'gatsby';
import * as React from 'react';
import Markdown from 'react-markdown';

import { mapBlock, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

export interface FeatureProps {
  buttons: BlokData[];
  copy: string;
  image: string;
  orientation: 'forward' | 'reverse' | '';
  title: string;
}
export interface FeaturesAlternatingProps {
  items: BlokData[];
}

export const Feature: React.SFC<FeatureProps> = ({ buttons, copy, image, orientation, title }) => (
  <section className={`feature ${orientation || ''}`}>
    <div className="image">
      <StoryblokImage
        src={image} 
        alt="Feature Image" 
        width={100} 
        height={100}
        aspectRatio={1/1}
        sizes={[
          '(min-width: 1680px) 30vw',
          '(min-width: 1280px) 40vw',
          '(min-width: 980px) 45vw',
          '100vw',
        ]} />  
    </div>
    <div className="content">
      <div className="inner">
        <header className="major">
          <h3>{title}</h3>
        </header>
        <Markdown source={copy} />
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
