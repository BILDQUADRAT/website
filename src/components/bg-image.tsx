import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';

export const BgImage: React.SFC<GatsbyImageProps> = (props: GatsbyImageProps) => (
  <Img
    outerWrapperClassName="gatsby-image-background"
    {...props}
  />
);

export default BgImage;
