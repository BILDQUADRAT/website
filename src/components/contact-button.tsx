import * as React from 'react';

import { Contact } from './contact';

export interface ContactButtonProps {
  text: string;
}

export interface ContactButtonState {
  isOpen: boolean;
}

export class ContactButton extends React.Component<ContactButtonProps, ContactButtonState> {
  constructor(props: ContactButtonProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <>
        <a className="button next scrolly" onClick={this.handleOpen}>{this.props.text}</a>

        <Contact
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
          onSubmitFailure={console.error} // TODO(neolegends): Make it useful for the user
          onSubmitSuccess={this.handleClose}
        />
      </>
    );
  }

  private handleClose = (ev?: React.MouseEvent<any>) => {
    ev && ev.preventDefault && ev.preventDefault();
    this.setState({ isOpen: false });
  }

  private handleOpen = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    this.setState({ isOpen: true });
  }
}
