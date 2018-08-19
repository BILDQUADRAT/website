import { Link } from 'gatsby';
import React from 'react';
import { BlokData, mapBlocks } from '../util/storyblok';

export interface TileProps {
  image: string;
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
        <Link to={''} className="link">{props.title}</Link>
      </h3>
      <p>{props.teaser}</p>
    </header>
    <Link to={''} className="link primary" />
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
