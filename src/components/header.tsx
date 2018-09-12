import { Link } from 'gatsby';
import React, { Component } from 'react';

import Menu from './menu';

interface HeaderProps {
  siteTitle: string;
}

interface HeaderState {
  menuOpen: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidUpdate(_: any, prevState: HeaderState) {
    if (prevState.menuOpen !== this.state.menuOpen) {
      if (this.state.menuOpen) {
        document.body.classList.add('menu-visible');
      } else {
        document.body.classList.remove('menu-visible');
      }
    }
  }

  openMenu(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ menuOpen: true });
    document.dispatchEvent(new CustomEvent('page-blur', {detail: {blurred: true}}));
  }

  closeMenu(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ menuOpen: false });
    document.dispatchEvent(new CustomEvent('page-blur', {detail: {blurred: false}}));
  }

  render() {
    return (
      <>
        <header id="header" className="alt">
          <Link to="/" className="logo">bildquadrat</Link>
          <nav>
              <a href="#menu" onClick={this.openMenu}>Menu</a>
          </nav>
        </header>
        <Menu visible={this.state.menuOpen} onCloseMenu={this.closeMenu} />
      </>
    );
  }
}

export default Header;
