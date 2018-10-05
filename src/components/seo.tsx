import React from 'react';

import MetaTags from '../util/meta';

export interface SeoProps {
  title: string;
  og_description?: string;
  og_image?: string;
  og_title?: string;
}

export const Seo: React.SFC<SeoProps> = ({ og_description, og_image, og_title, title }) => (
  <MetaTags>
    {title && <title>{title}</title>}
    {og_title || title &&
      <meta property="og:title" content={og_title || title}/>}
    {og_image &&
      <meta property="og:image" content={og_image}/>}
    {og_description &&
      <meta property="og:description" content={og_description}/>}
  </MetaTags>
);
