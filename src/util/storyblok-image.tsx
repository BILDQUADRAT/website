import * as React from 'react';

interface StoryblokImageProps {
  alt: string;
  aspectRatio?: number;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string[];
  smart?: boolean;
  src: string;
}

/**
 * Generates a URL for Storyblok's Image Service
 *
 * Function taken from https://www.storyblok.com/docs/image-service#how-to-use-it
 *
 * @param image image url to resize
 * @param option <width>x<height>
 */
const resize = (image: string, width?: number, height: number = 0, smart: boolean = false) => {
  const imageService = '//img2.storyblok.com/';
  const path = image.replace('//a.storyblok.com', '');
  return `${imageService}${width}x${height}${smart ? '/smart' : ''}${path}`;
};

/**
 * Generates an srcset string for Storyblok images
 *
 * @param image image url to generate an srcset for
 * @param maxWidth maximum image width that will be used
 * @param stepSize delta between srcset steps
 */
const generateSrcset = (
  image: string,
  aspectRatio?: number,
  smart: boolean = false,
  maxWidth: number = 3000,
  stepSize: number = 100,
) => (
  Array.apply(null, {length: Math.floor(maxWidth / stepSize)})
    .map((e, i) => (i + 1) * stepSize)
    .map(width => `${resize(image, width, aspectRatio ? width * aspectRatio : 0)} ${width}w`)
    .join(', ')
);

const StoryblokImage = (props: StoryblokImageProps) => (
  <img
    alt={props.alt}
    className={props.className}
    height={props.height || (props.aspectRatio && props.width ? props.width * props.aspectRatio : undefined)}
    src={props.src}
    width={props.width}
    srcSet={generateSrcset(props.src, props.aspectRatio, props.smart)}
    sizes={props.sizes ? props.sizes.join(', ') : undefined}
  />
);

export default StoryblokImage;
