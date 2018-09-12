import Page from "../templates/blok-page";
import GenericPage from '../templates/generic-page';
import { Story } from "../util/storyblok";

import { AboutUs, Person } from "./about-us";
import { Banner } from "./banner";
import { Button } from "./button";
import { ContactButton } from "./contact-button";
import { Feature, FeaturesAlternating } from "./feature";
import { FullwidthImage } from "./fullwidth-image";
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
  'about-us': AboutUs,
  banner: Banner,
  button: Button,
  'contact-button': ContactButton,
  feature: Feature,
  'feature-alternating': FeaturesAlternating,
  'fullwidth-image': FullwidthImage,
  person: Person,
  richtext: Richtext,
  tile: Tile,
  tiles: Tiles,
};

export default {
  ...contentTypes,
  ...blocks,
};
