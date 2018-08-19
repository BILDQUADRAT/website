import React from 'react';
import SbEditable from 'storyblok-react'

import { blocks } from '../components';

export interface Story {
  id: string,
  name: string,
  created_at: string,
  uuid: string,
  slug: string,
  full_slug: string,
  content: BlokData,
  is_startpage: boolean,
  parent_id: number | string,
  group_id: string,
}

export interface BlokData {
  _uid: string,
  component: string,
  [key: string]: any
}

export const mapBlock = (blok: BlokData, extraProps?: any) => blok.component in blocks && (
  <SbEditable content={blok} key={blok._uid}>
    {React.createElement(blocks[blok.component], { ...extraProps, ...blok })}
  </SbEditable>
);

export const mapBlocks = (bloks?: BlokData[], extraProps?: any) => {
  if(!bloks) {
    return null;
  }
  return bloks.map(blok => mapBlock(blok, extraProps));
}
