import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'gatsby';

interface MenuProps {
  visible: boolean;
  onCloseMenu: (e: React.MouseEvent<HTMLElement>) => void;
  menuItems: MenuItem[];
}

export interface MenuItem {
  title: string;
  url: string;
}

class Menu extends Component<MenuProps, any> {
  el: HTMLDivElement | null = null;

  componentDidMount() {
    this.el = document.createElement('div');
    document.body.appendChild(this.el);
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
    return ReactDOM.createPortal(
      <nav id="menu" className={this.props.visible ? 'menu-visible' : ''}>
        <div className="inner">
          <ul className="links">
            {this.props.menuItems.map(item => (<li><Link to={item.url}>{item.title}</Link></li>))}
          </ul>
        </div>
        <a className="close" onClick={this.props.onCloseMenu}>Close</a>
        <div className="backdrop" onClick={this.props.onCloseMenu}/>
      </nav>,
      this.el,
    );
  }
}

export default Menu;
