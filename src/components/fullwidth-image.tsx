import * as React from 'react';

import StoryblokImage from '../util/storyblok-image';

export interface FullwidthImageProps {
  alt?: string;
  height?: number;
  image: string;
  width?: number;
}

export const FullwidthImage: React.SFC<FullwidthImageProps> = ({ alt, height, image, width }) => (
  <span className="image main">
    <StoryblokImage
      src={image}
      alt={alt}
      height={height}
      width={width}
    />
  </span>
);
