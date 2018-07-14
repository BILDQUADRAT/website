import React, { Component } from 'react';

interface BannerData {
  headline: string;
  subheader: string;
  cta: string;
  image: {
    publicURL: string;
  };
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
      style={image ? { backgroundImage: `url(${image.publicURL})` } : {}}
    >
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
