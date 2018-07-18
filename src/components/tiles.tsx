import { Link } from 'gatsby';
import React from 'react';

import { BgImage, ImageSources } from './image';

export interface TileProps {
  image: ImageSources | null;
  url: string | null;
  headline: string | null;
  copy: string | null;
}

export const Tile: React.SFC<TileProps> = (props: TileProps) => (
  <article>
    {props.image && <BgImage imageSources={props.image} />}
    <header className="major">
      <h3>
        <Link to={props.url || ''} className="link">{props.headline}</Link>
      </h3>
      <p>{props.copy}</p>
    </header>
    <Link to={props.url || ''} className="link primary" />
  </article>
);

export const TileSection = (props: React.HTMLProps<HTMLDivElement>) => (
  <section className="tiles" {...props} />
);

export const showTiles = (tiles: Array<TileProps | null>, extraProps: React.HTMLProps<HTMLDivElement> = {}) => (
  <TileSection {...extraProps}>
    {tiles.map(tile => (tile && <Tile key={tile.url || ''} {...tile} />))}
  </TileSection>
);
