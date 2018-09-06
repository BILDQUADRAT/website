import React from 'react';

import { mapBlock, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

interface BannerProps {
  headline: string;
  subheadline: string;
  cta: BlokData[];
  image: string;
  className?: string;
}

interface BannerState {
  contactOpen: boolean;
}

export class Banner extends React.Component<BannerProps, BannerState> {
  constructor(props: BannerProps) {
    super(props);

    this.state = { contactOpen: false };
  }

  render() {
    const { className, headline, subheadline, cta, image } = this.props;

    return (
      <section
        id="banner"
        className={className || "major"}
      >
        {image && <StoryblokImage src={image} alt="Banner Image" />}

        <div className="inner">
          <header className="major">
            <h1>{headline}</h1>
          </header>
          <div className="content">
            <p>{subheadline}</p>

            <ul className="actions">
              {cta.map(blok => <li key={blok._uid}>{mapBlock(blok)}</li>)}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Banner;
