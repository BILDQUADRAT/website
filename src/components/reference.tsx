import chunk from 'lodash-es/chunk';
import * as React from 'react';

import { mapBlock, BlokData } from '../util/storyblok';

export interface ReferenceProps {
  customer: string;
  description: string;
  image: string;
  target: string;
  title: string;
}

export interface ReferencesProps {
  references: BlokData[];
  rowSize: number;
}

export const Reference: React.SFC<ReferenceProps> = ({ customer, description, image, title, target }) => (
  <article className="reference"/>
);

export const References: React.SFC<ReferencesProps> = ({ references }) => (
  <section className="references">
    {chunk(references, 3).map((chunk, i) => (
      <ul className="row" key={i}>
        {chunk.map(blok => <li key={blok._uid}>{mapBlock(blok)}</li>)}
      </ul>
    ))}
  </section>
);
