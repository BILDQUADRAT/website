import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface MenuProps {
  visible: boolean;
  onCloseMenu: () => void;
}

class Menu extends Component<MenuProps, any> {
  el: HTMLDivElement;

  constructor(props: MenuProps) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <nav id="menu" className={this.props.visible ? 'menu-visible' : ''}>
        <div className="inner">
          <ul className="links">
            <li><a href="index.html">Home</a></li>
            <li><a href="landing.html">Landing</a></li>
            <li><a href="generic.html">Generic</a></li>
            <li><a href="elements.html">Elements</a></li>
          </ul>
          <ul className="actions stacked">
            <li><a href="#" className="button primary fit">Get Started</a></li>
            <li><a href="#" className="button fit">Log In</a></li>
          </ul>
        </div>
        <a className="close" onClick={this.props.onCloseMenu}>Close</a>
      </nav>,
      this.el,
    );
  }
}

export default Menu;
