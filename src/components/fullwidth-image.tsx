import * as React from 'react';

export interface FullwidthImageProps {
  alt: string;
  image: string;
}

// TODO(neolegends): Use StoryblokImage here
export const FullwidthImage: React.SFC<FullwidthImageProps> = ({ alt, image }) => (
  <span className="image main">
    <img src={image} alt={alt}/>
  </span>
);
