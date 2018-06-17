import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuOpen } from '../store';
import PropTypes from 'prop-types';

@connect(
    null,
    dispatch => ({
        openMenu: () => dispatch(setMenuOpen(true)),
    })
)

export class Header extends Component {
    static propTypes = {
        openMenu: PropTypes.func.isRequired,
    }

    render () {
        return (
            <header id="header" className="alt">
                <a href="/" className="logo">bildquadrat</a>
                <nav>
                    <a href="#menu" onClick={this.props.openMenu}>Menu</a>
                </nav>
            </header>
        )
    }
}

export default Header;
