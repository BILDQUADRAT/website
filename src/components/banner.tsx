import Img from 'gatsby-image';
import React, { Component } from 'react';

import { SharpFluidImage } from '../types';

import BgImage from './bg-image';

interface BannerData {
  headline: string;
  subheader: string;
  cta: string;
  image: SharpFluidImage;
}

interface BannerProps {
  banner: BannerData;
  className?: string;
}

export const Banner: React.SFC<BannerProps> = props => {
  const { headline, subheader, cta, image } = props.banner;
  return (
    <section
      id="banner"
      className={props.className || "major"}
    >
      <BgImage fluid={image.childImageSharp.fluid} />
      <div className="inner">
        <header className="major">
          <h1>{headline}</h1>
        </header>
        <div className="content">
          <p>{subheader}</p>
          <ul className="actions">
            <li><a href="#one" className="button next scrolly">{cta}</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
