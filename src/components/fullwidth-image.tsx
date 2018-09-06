import * as React from 'react';

export interface FullwidthImageProps {
  alt: string;
  image: string;
}

// TODO(neolegends): Use StoryblokImage here
export const FullwidthImage = (props: FullwidthImageProps) => (
  <span className="image main">
    <img src={props.image} alt={props.alt}/>
  </span>
);
