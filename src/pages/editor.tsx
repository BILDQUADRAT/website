import React from 'react';
import SbEditable from 'storyblok-react';

import { StoryblokEntry } from '../templates/storyblok-entry';
import { mapBlock } from '../util/storyblok';

declare global {
  interface Window {
    storyblok: any;
  }
}

const loadStoryblokBridge = (cb: (ev: Event) => any) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${process.env.GATSBY_STORYBLOK_ACCESS_TOKEN}`;
  script.onload = cb;
  document.body.appendChild(script);
};

const getParam = (val: string) => {
  const pair = location.search.substr(1)
    .split('&')
    .map(part => part.split('=').map(decodeURIComponent) as [string, string])
    .find(([k]) => k === val);

  return pair ? pair[1] : '';
};

export interface StoryblokStory {
  id: string;
  content: any;
}

export interface StoryblokEditorState {
  story: StoryblokStory | null;
}

class StoryblokEditor extends React.Component<{}, StoryblokEditorState> {
  constructor(props: {}) {
    super(props);
    this.state = { story: null };
  }

  componentDidMount() {
    loadStoryblokBridge(() => this.initStoryblokEvents());
  }

  loadStory(payload: { storyId: string }) {
    window.storyblok.get({
      slug: payload.storyId,
      version: 'draft',
    }, (data: { story: StoryblokStory }) => {
      this.setState({ story: data.story });
    });
  }

  initStoryblokEvents() {
    const storyblok = window.storyblok || null;
    if (!storyblok) {
      return;
    }

    this.loadStory({ storyId: getParam('_storyblok') });

    storyblok.on(['change', 'published'], (payload: { storyId: string }) => {
      this.loadStory(payload);
    });

    storyblok.on('input', (payload: { story: StoryblokStory }) => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        this.setState({ story: payload.story });
      }
    });

    storyblok.pingEditor(() => {
      if (storyblok.inEditor) {
        storyblok.enterEditmode();
      }
    });
  }

  render() {
    if (!this.state.story) {
      return null;
    }

    const { story } = this.state;

    return (
      <SbEditable content={story.content}>
        <StoryblokEntry story={story} />
      </SbEditable>
    );
  }
}

export default StoryblokEditor;
