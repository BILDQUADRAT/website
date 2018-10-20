import classNames from 'classnames';
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
  videoLoaded: boolean;
}

export class Banner extends React.Component<BannerProps, BannerState> {
  private videoRef = React.createRef<HTMLVideoElement>();

  constructor(props: BannerProps) {
    super(props);

    this.state = {
      contactOpen: false,
      videoLoaded: false,
    };
  }

  componentDidMount() {
    this.fadeInVideoOnceLoaded();

    document.addEventListener('page-blur', (e: any) => {
      if (!this.videoRef.current) {
        return;
      }

      if (e.detail.blurred) {
        this.videoRef.current.pause();
      } else {
        this.videoRef.current.play();
      }
    });
  }

  render() {
    const {
      className,
      cta,
      headline,
      image,
      subheadline,
      video_mp4,
      video_ogg,
      video_webm,
    } = this.props;
    const { videoLoaded } = this.state;

    return (
      <section className={classNames(className || "major", "banner")}>
        {image && <StoryblokImage src={image} alt="Banner Image" />}
        {(video_mp4 || video_ogg || video_webm) && (
          <div className="video-container">
            <video
              className={classNames({ loaded: videoLoaded })}
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

  private fadeInVideoOnceLoaded() {
    const videoEl = this.videoRef.current;
    if (!videoEl) {
      return;
    }

    const fadeIn = () => {
      videoEl.removeEventListener('canplay', fadeIn);
      this.setState({ videoLoaded: true });
    };
    videoEl.addEventListener('canplay', fadeIn);
  }
}

export default Banner;
