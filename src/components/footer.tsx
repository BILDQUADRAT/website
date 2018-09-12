import * as React from 'react';

export interface SocialMediaEntry {
  name: string;
  url: string;
}

export interface FooterProps {
  socialLinks: SocialMediaEntry[];
  title: string;
}

export const Footer: React.SFC<FooterProps> = (props) => (
  <footer>
    <div className="inner">
      <ul className="icons">
        {props.socialLinks.map(({ name, url }) => (
          <li key={name}>
            <a href={url} className={`icon alt fa-${name}`}>
              <span className="label">{name}</span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="copyright">
        <li>© {(new Date()).getFullYear()} {props.title}</li>
        <li>Theme by <a href="https://html5up.net">HTML5 UP</a></li>
      </ul>
    </div>
  </footer>
);
