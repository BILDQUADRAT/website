import Page from "../templates/page";
import { Story } from "../util/storyblok";

import { Banner } from "./banner";
import Button from "./button";
import { ContactButton } from "./contact-button";
import { Feature, FeaturesAlternating } from "./feature";
import { Tile, Tiles } from "./tiles";

export interface ContentTypeProps {
  story: Story;
}

export interface ComponentMap<P> {
  [key: string]: React.ComponentClass<P> | React.SFC<P>;
}

export const contentTypes: ComponentMap<ContentTypeProps> = {
  page: Page,
};

export const blocks: ComponentMap<any> = {
  banner: Banner,
  button: Button,
  'contact-button': ContactButton,
  feature: Feature,
  'feature-alternating': FeaturesAlternating,
  tile: Tile,
  tiles: Tiles,
};

export default {
  ...contentTypes,
  ...blocks,
};
