import React from 'react';

import { Contact } from './contact';

interface BannerProps {
  headline: string;
  subheadline: string;
  cta: string;
  image: string;
  className?: string;
}

interface BannerState {
  contactOpen: boolean;
}

export class Banner extends React.Component<BannerProps, BannerState> {
  constructor(props: BannerProps) {
    super(props);

    this.state = { contactOpen: false };
  }

  render() {
    const { className, headline, subheadline, cta, image } = this.props;

    return (
      <section
        id="banner"
        className={className || "major"}
      >
        {image && <img src={image} />}

        <div className="inner">
          <header className="major">
            <h1>{headline}</h1>
          </header>
          <div className="content">
            <p>{subheadline}</p>
            <ul className="actions">
              <li>
                <a
                  href="#one"
                  className="button next scrolly"
                  onClick={this.handleOpenContact}
                >
                  {cta}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Contact
          isOpen={this.state.contactOpen}
          onRequestClose={this.handleCloseContact}
          onSubmitSuccess={this.handleCloseContact}
        />
      </section>
    );
  }

  private handleOpenContact = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    this.setState({ contactOpen: true });
  }

  private handleCloseContact = (ev?: React.MouseEvent<any>) => {
    ev && ev.preventDefault && ev.preventDefault();
    this.setState({ contactOpen: false });
  }
}

export default Banner;
