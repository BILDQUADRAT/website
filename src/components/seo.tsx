import React from 'react';
import Helmet from 'react-helmet';

export interface SeoProps {
  title: string;
  og_description?: string;
  og_image?: string;
  og_title?: string;
}

export const Seo: React.SFC<SeoProps> = ({ og_description, og_image, og_title, title }) => (
  <Helmet>
    <title>{title}</title>
    {og_title &&
      <meta property="og:title" content={og_title}/>}
    {og_image &&
      <meta property="og:image" content={og_image}/>}
    {og_description &&
      <meta property="og:description" content={og_description}/>}
  </Helmet>
);
