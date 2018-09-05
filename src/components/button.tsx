import { Link } from 'gatsby';
import React from 'react';

export interface ButtonProps {
  text: string;
  target: string;
}

const Button: React.SFC<ButtonProps> = ({ target, text }) => (
  <Link to={target} className="button">{text}</Link>
);

export default Button;
