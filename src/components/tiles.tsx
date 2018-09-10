import { Link } from 'gatsby';
import React from 'react';

import { StoryblokLink } from '../types';
import { mapBlocks, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

export interface TileProps {
  image: string;
  target: StoryblokLink;
  title: string;
  teaser: string;
}

export interface TilesProps {
  items: BlokData[];
}

// TODO(leolabs): Specify background image sizes for better browser img selection
export const Tile: React.SFC<TileProps> = (props: TileProps) => (
  <article className="tile">
    <StoryblokImage
      className="background"
      src={props.image}
    />

    <header className="major">
      <h3>
        <Link to={`/${props.target.cached_url}`} className="link">{props.title}</Link>
      </h3>
      <p>{props.teaser}</p>
    </header>
    <Link to={`/${props.target.cached_url}`} className="link primary" />
  </article>
);

export const Tiles: React.SFC<TilesProps> = (props: TilesProps) => (
  <section className="tiles">
    {mapBlocks(props.items)}
  </section>
);
