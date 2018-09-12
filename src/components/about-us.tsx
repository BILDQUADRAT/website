import React from 'react';
import Markdown from 'react-markdown';

import { mapBlock, BlokData } from '../util/storyblok';
import StoryblokImage from '../util/storyblok-image';

export interface AboutPersonProps {
  description: string;
  image: string;
  name: string;
  role: string;
}

export interface AboutUsProps {
  intro: string;
  people: BlokData[];
  title: string;
}

export const Person: React.SFC<AboutPersonProps> = ({ description, image, name, role }) => (
  <article className="person">
    <div className="profile-row">
      <StoryblokImage className="profile" src={image}/>

      <header className="major">
        <h3>{name}</h3>
        <p>{role}</p>
      </header>
    </div>

    <Markdown className="description" source={description}/>
  </article>
);

export const AboutUs: React.SFC<AboutUsProps> = ({ intro, people, title }) => (
  <section className="about-us">
    <div className="inner">
      <header className="major">
        <h2>{title}</h2>
      </header>

      <Markdown className="intro" source={intro}/>

      <ul className="alt">
        {people.map(p => <li key={p._uid}>{mapBlock(p)}</li>)}
      </ul>
    </div>
  </section>
);
