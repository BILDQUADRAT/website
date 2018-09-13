import { Link } from 'gatsby';
import React, { Component } from 'react';

import Menu, { MenuItem } from './menu';

interface HeaderProps {
  siteTitle: string;
  menuItems: MenuItem[];
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

  componentWillUnmount() {
    document.body.classList.remove('menu-visible');
    document.dispatchEvent(new CustomEvent('page-blur', { detail: { blurred: false } }));
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

  openMenu(event: React.MouseEvent<HTMLElement>) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ menuOpen: true });
    document.dispatchEvent(new CustomEvent('page-blur', { detail: { blurred: true } }));
  }

  closeMenu(event: React.MouseEvent<HTMLElement>) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ menuOpen: false });
    document.dispatchEvent(new CustomEvent('page-blur', { detail: { blurred: false } }));
  }

  render() {
    return (
      <>
        <header id="header" className="alt">
          <Link to="/" className="logo">
            <img src="/images/logo-white.svg" alt="Bildquadrat Logo" />
          </Link>
          <nav>
            <a href="#menu" onClick={this.openMenu}>Menu</a>
          </nav>
        </header>

        <Menu
          visible={this.state.menuOpen}
          onCloseMenu={this.closeMenu}
          menuItems={this.props.menuItems}
        />
      </>
    );
  }
}

export default Header;
