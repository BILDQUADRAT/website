import React from 'react';
import { Link } from 'gatsby';

import { BlokData } from '../util/storyblok';

export interface ButtonProps {
  text: string;
  target: string;
}

class Button extends React.Component<ButtonProps> {
  render() {
    const { target, text } = this.props;
    return (
      <Link to={target} className="button">{text}</Link>
    )
  }
}

export default Button;
