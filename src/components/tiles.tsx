import { Link } from 'gatsby';
import React from 'react';

import { ImageFile } from '../types';

interface TileProps {
  image?: ImageFile;
  url: string;
  headline: string;
  copy?: string;
}

export const Tile: React.SFC<TileProps> = (props: TileProps) => (
  <article style={props.image ? { backgroundImage: `url(${props.image.publicURL})` } : {}}>
    <header className="major">
      <h3>
        <Link to={props.url} className="link">{props.headline}</Link>
      </h3>
      <p>{props.copy}</p>
    </header>
    <Link to={props.url} className="link primary" />
  </article>
);

export const TileSection = (props: React.HTMLProps<HTMLDivElement>) => (
  <section className="tiles" {...props} />
);

export const showTiles = (tiles: Array<TileProps>, extraProps: React.HTMLProps<HTMLDivElement> = {}) => (
  <TileSection {...extraProps}>
    {tiles.map(tile => (<Tile key={tile.url} {...tile} />))}
  </TileSection>
);
