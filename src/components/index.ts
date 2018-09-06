import Page from "../templates/blok-page";
import GenericPage from '../templates/generic-page';
import { Story } from "../util/storyblok";

import { Banner } from "./banner";
import Button from "./button";
import { ContactButton } from "./contact-button";
import { Feature, FeaturesAlternating } from "./feature";
import { FullwidthImage } from "./fullwidth-image";
import { Reference, References } from "./reference";
import { Richtext } from "./richtext";
import { Tile, Tiles } from "./tiles";

export interface ContentTypeProps {
  story: Story;
}

export interface ComponentMap<P> {
  [key: string]: React.ComponentClass<P> | React.SFC<P>;
}

export const contentTypes: ComponentMap<ContentTypeProps> = {
  'blok-page': Page,
  'generic-page': GenericPage,
};

export const blocks: ComponentMap<any> = {
  banner: Banner,
  button: Button,
  'contact-button': ContactButton,
  feature: Feature,
  'feature-alternating': FeaturesAlternating,
  'fullwidth-image': FullwidthImage,
  reference: Reference,
  references: References,
  richtext: Richtext,
  tile: Tile,
  tiles: Tiles,
};

export default {
  ...contentTypes,
  ...blocks,
};
