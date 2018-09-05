import * as React from 'react';
import ReactDOM from 'react-dom';

export interface ContactProps {
  isOpen: boolean;

  onRequestClose?: React.MouseEventHandler<HTMLAnchorElement>;
  onSubmitFailure?: (e: Error) => void;
  onSubmitSuccess?: () => void;
}

export interface ContactState {
  email: string;
  message: string;
  name: string;
}

const defaultState: ContactState = {
  email: '',
  message: '',
  name: '',
};

export class Contact extends React.Component<ContactProps, ContactState> {
  private el: HTMLDivElement | null = null;

  constructor(props: Readonly<ContactProps>) {
    super(props);

    this.state = defaultState;
  }

  componentDidMount() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
  }

  componentDidUpdate(prevProps: Readonly<ContactProps>) {
    if (prevProps.isOpen === this.props.isOpen) {
      return;
    }

    if (this.props.isOpen) {
      document.body.classList.add('contact-visible');
    } else {
      document.body.classList.remove('contact-visible');
    }
  }

  componentWillUnmount() {
    if (this.el) {
      document.body.removeChild(this.el);
    }
  }

  render() {
    if (!this.el) {
      return null;
    }

    return ReactDOM.createPortal(this.renderForm(), this.el);
  }

  reset() {
    this.setState(defaultState);
  }

  private renderForm() {
    return (
      <form
        className={`contact ${this.props.isOpen ? 'visible' : ''}`}
        name="contact"
        onSubmit={this.handleSubmit}
      >
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="col-6 col-12-xsmall">
            <input
              type="email"
              name="email"
              placeholder="E-Mail Adresse"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div className="col-12">
            <textarea
              name="message"
              placeholder="Nachricht"
              rows={6}
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
          </div>
          <div className="col-12">
            <ul className="actions">
              <li>
                <input
                  type="submit"
                  value="Senden"
                  className="primary"
                />
              </li>
              <li>
                <input
                  type="reset"
                  value="Reset"
                  onClick={this.handleReset}
                />
              </li>
            </ul>
          </div>
        </div>

        <a
          className="close"
          onClick={this.props.onRequestClose}
        >
          Schließen
        </a>
      </form>
    );
  }

  private getFormUrlEncoded = () => Object.keys(this.state)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.state[k])}`)
    .join('&')

  private handleEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: ev.target.value })

  private handleMessageChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ message: ev.target.value })

  private handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: ev.target.value })

  private handleReset = (ev: React.MouseEvent<HTMLInputElement>) => {
    ev.preventDefault();
    this.reset();
  }

  private handleSubmit = (ev: React.MouseEvent<HTMLFormElement>) => {
    ev.preventDefault();

    fetch('/', {
      body: this.getFormUrlEncoded(),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'post',
    })
      .then(this.props.onSubmitSuccess)
      .catch(this.props.onSubmitFailure);
  }
}
