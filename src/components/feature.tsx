import React from 'react';
import { Link } from 'gatsby';
import Markdown from 'react-markdown';

import { BlokData, mapBlock } from '../util/storyblok';

export interface FeatureProps {
  image: string;
  title: string;
  copy: string;
  buttons: BlokData[];
  orientation: 'forward' | 'reverse' | '';
}

export class Feature extends React.Component<FeatureProps> {
  render() {
    const { orientation, image, title, copy, buttons } = this.props;
    return (
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
                <li>
                  {mapBlock(blok)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export class FeaturesAlternating extends React.Component<{ items: BlokData[] }> {
  render() {
    return this.props.items.map(
      (blok: BlokData, i: number) => mapBlock(blok, { orientation: i % 2 == 0 ? 'forward' : 'reverse' })
    );
  }
}
