import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

import { ImageFile, SharpFluidImage } from '../types';

interface TileProps {
  image?: SharpFluidImage;
  url: string;
  headline: string;
  copy?: string;
}

export const Tile: React.SFC<TileProps> = (props: TileProps) => (
  <article>
    {props.image && <Img fluid={props.image.childImageSharp.fluid} outerWrapperClassName="image" />}
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
