import { Link } from 'gatsby';
import React from 'react';

import { StoryblokLink } from '../util/storyblok';

export interface ButtonProps {
  text: string;
  target: string | StoryblokLink;
}

const Button: React.SFC<ButtonProps> = ({ target, text }) => (
  <Link
    className="button"
    to={(typeof target === 'string') ? target : `/${target.cached_url}`}
  >
    {text}
  </Link>
);

export default Button;
