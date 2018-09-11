import React from 'react';

import { contentTypes } from '../components';
import { SerializedStory, Story } from '../util/storyblok';

export interface StoryblokEntryContextProps {
  pathContext: {
    story: SerializedStory;
  };
}

export interface StoryblokEntryProps {
  story: Story;
}

export const StoryblokEntry: React.SFC<StoryblokEntryProps> = ({ story }) => {
  const { component, _uid } = story.content;

  return (component in contentTypes)
    ? React.createElement(contentTypes[component], { key: _uid, story })
    : null;
};

const withContext = (WrappedComponent: React.ComponentType<StoryblokEntryProps>) => {
  class StoryblokEntryContext extends React.Component<StoryblokEntryContextProps, StoryblokEntryProps> {
    static getDerivedStateFromProps(
      props: StoryblokEntryContextProps,
      state: StoryblokEntryProps,
    ): Partial<StoryblokEntryProps> | null {
      if (state.story.uuid === props.pathContext.story.uuid) {
        return null;
      }

      return StoryblokEntryContext.prepareStory(props);
    }

    static prepareStory(props: StoryblokEntryContextProps): StoryblokEntryProps {
      const story = {
        ...props.pathContext.story,
        content: JSON.parse(props.pathContext.story.content),
      };

      return { story };
    }

    constructor(props) {
      super(props);

      this.state = StoryblokEntryContext.prepareStory(props);
    }

    render() {
      return <WrappedComponent story={this.state.story} />;
    }
  }

  return StoryblokEntryContext;
};

export default withContext(StoryblokEntry);
