import * as React from 'react';
import Markdown from 'react-markdown';

export interface RichtextProps {
  copy: string;
}

export const Richtext = (props: RichtextProps) => <Markdown source={props.copy}/>;
