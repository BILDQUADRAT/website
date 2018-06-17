import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setMenuOpen } from '../store';

@connect(
    state => ({
        visible: state.menuOpen,
    }),
    dispatch => ({
        closeMenu: () => dispatch(setMenuOpen(false)),
    }),
)

export class Menu extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        closeMenu: PropTypes.func.isRequired,
    }

    render () {
        return (
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
                <a className="close" onClick={this.props.closeMenu}>Close</a>
            </nav>
        )
    }
}

export default Menu;
