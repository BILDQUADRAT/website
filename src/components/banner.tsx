import React from 'react';

import { mapBlock, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

interface BannerProps {
  className?: string;
  cta: BlokData[];
  headline: string;
  image: string;
  subheadline: string;
  video_mp4: string;
  video_ogg: string;
  video_webm: string;
}

interface BannerState {
  contactOpen: boolean;
}

export class Banner extends React.Component<BannerProps, BannerState> {
  private videoRef = React.createRef<HTMLVideoElement>();

  constructor(props: BannerProps) {
    super(props);

    this.state = { contactOpen: false };
  }

  componentDidMount() {
      this.fadeInVideoOnceLoaded();
  }

  render() {
    const { className, headline, subheadline, cta, image, video_mp4, video_ogg, video_webm } = this.props;
    const hasVideo = video_mp4 || video_ogg || video_webm;

    return (
      <section
        id="banner"
        className={className || "major"}
      >
        {image && <StoryblokImage src={image} alt="Banner Image" />}
        {hasVideo && (
          <div className="video-container">
            <video
              className="hidden"
              controls={false}
              autoPlay={true}
              loop={true}
              muted={true}
              ref={this.videoRef}
            >
              {video_mp4 && <source src={video_mp4} type="video/mp4"/>}
              {video_ogg && <source src={video_ogg} type="video/ogg"/>}
              {video_webm && <source src={video_webm} type="video/webm"/>}
            </video>
          </div>
        )}

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

  private fadeInVideoOnceLoaded = () => {
    if (!this.videoRef.current) {
      return;
    }

    if (this.videoRef.current.readyState !== 4) { // Video is loaded and enough is buffered
      setTimeout(this.fadeInVideoOnceLoaded, 50);
      return;
    }

    this.videoRef.current.classList.remove('hidden'); // Fade it in
  }
}

export default Banner;
