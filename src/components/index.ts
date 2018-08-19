import Page from "../templates/page";
import { Banner } from "./banner";
import { Story } from "../util/storyblok";
import { Tiles, Tile } from "./tiles";
import { Feature, FeaturesAlternating } from "./feature";
import Button from "./button";

export interface ContentTypeProps {
  story: Story,
}

export type ComponentMap<P> = {
  [key: string]: React.ComponentClass<P> | React.SFC<P>
}

export const contentTypes: ComponentMap<ContentTypeProps> = {
  page: Page,
};

export const blocks: ComponentMap<any> = {
  banner: Banner,
  button: Button,
  tile: Tile,
  tiles: Tiles,
  feature: Feature,
  'feature-alternating': FeaturesAlternating,
};

export default {
  ...contentTypes,
  ...blocks,
};
