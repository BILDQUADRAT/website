import React from 'react';

import { contentTypes } from '../components';

export interface StoryblokEntryContextProps {
  pathContext: StoryblokEntryProps;
}

export interface StoryblokEntryProps {
  story: {
    content: any,
  };
}

export const StoryblokEntry: React.SFC<StoryblokEntryProps> = ({ story }) => {
  const { component, _uid } = story.content;

  return (component in contentTypes)
    ? React.createElement(contentTypes[component], { key: _uid, story })
    : null;
};

const withContext = (WrappedComponent: React.ComponentType<StoryblokEntryProps>) => {
  class StoryblokEntryContext extends React.Component<StoryblokEntryContextProps, StoryblokEntryProps> {
    constructor(props: StoryblokEntryContextProps) {
      super(props);
      const story = {
        ...props.pathContext.story,
        content: JSON.parse(props.pathContext.story.content),
      };
      this.state = { story };
    }

    render() {
      return <WrappedComponent story={this.state.story} />;
    }
  }

  return StoryblokEntryContext;
};

export default withContext(StoryblokEntry);
