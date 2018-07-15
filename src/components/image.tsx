import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';

export interface ImageSources {
  childImageSharp: {
    fluid?: object;
    fixed?: object;
    sqip?: {
      dataURI?: string;
    }
  };
}

export interface ImageProps extends GatsbyImageProps {
  imageSources: ImageSources;
}

function maybeInsertSqip({ childImageSharp }: ImageSources) {
  if (!(childImageSharp.sqip && childImageSharp.sqip.dataURI)) {
    return { childImageSharp };
  }
  if (!!childImageSharp.fluid) {
    return {
      childImageSharp: {
        ...childImageSharp,
        fluid: {
          ...childImageSharp.fluid,
          base64: childImageSharp.sqip.dataURI,
        },
      },
    };
  }
  if (!!childImageSharp.fixed) {
    return {
      childImageSharp: {
        ...childImageSharp,
        fluid: {
          ...childImageSharp.fixed,
          base64: childImageSharp.sqip.dataURI,
        },
      },
    };
  }
  return { childImageSharp };
}

export const Image: React.SFC<ImageProps> = ({ imageSources, ...extraProps }: ImageProps) => {
  const image = maybeInsertSqip(imageSources);
  return (
    !!image.childImageSharp.fluid
      ? <Img fluid={image.childImageSharp.fluid} {...extraProps} />
      : <Img fixed={image.childImageSharp.fixed} {...extraProps} />
  );
};

export const BgImage: React.SFC<ImageProps> = (props: ImageProps) => (
  <Image
    outerWrapperClassName={`gatsby-image-background ${props.outerWrapperClassName}`}
    {...props}
  />
);
