import React from 'react';

interface BannerProps {
  headline: string;
  subheadline: string;
  cta: string;
  image: string;
  className?: string;
}

export const Banner: React.SFC<BannerProps> = props => {
  const { headline, subheadline, cta, image } = props;
  return (
    <section
      id="banner"
      className={props.className || "major"}
    >
      {image && <img src={image} />}
      <div className="inner">
        <header className="major">
          <h1>{headline}</h1>
        </header>
        <div className="content">
          <p>{subheadline}</p>
          <ul className="actions">
            <li><a href="#one" className="button next scrolly">{cta}</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
