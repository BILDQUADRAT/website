import { Link } from 'gatsby';
import React from 'react';

import { StoryblokLink } from '../types';
import { mapBlocks, BlokData } from '../util/storyblok';

export interface TileProps {
  image: string;
  target: StoryblokLink;
  title: string;
  teaser: string;
}

export interface TilesProps {
  items: BlokData[];
}

export const Tile: React.SFC<TileProps> = (props: TileProps) => (
  <article style={{ backgroundImage: `url(${props.image})` }}>
    <header className="major">
      <h3>
        <Link to={props.target.cached_url} className="link">{props.title}</Link>
      </h3>
      <p>{props.teaser}</p>
    </header>
    <Link to={props.target.cached_url} className="link primary" />
  </article>
);

export const TileSection = (props: React.HTMLProps<HTMLDivElement>) => (
  <section className="tiles" {...props} />
);

export const Tiles = (props: TilesProps) => (
  <TileSection>
    {mapBlocks(props.items)}
  </TileSection>
);
