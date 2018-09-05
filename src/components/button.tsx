import React from 'react';
import { Link } from 'gatsby';

import { BlokData } from '../util/storyblok';

export interface ButtonProps {
  text: string;
  target: string;
}

const Button: React.SFC<ButtonProps> = ({ target, text }) => (
  <Link to={target} className="button">{text}</Link>
);

export default Button;
