import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMenuOpen } from '../store/actions';
import PropTypes from 'prop-types';
import Link from '../util/link';

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
                <Link to="/" className="logo">bildquadrat</Link>
                <nav>
                    <a href="#menu" onClick={this.props.openMenu}>Menu</a>
                </nav>
            </header>
        )
    }
}

export default Header;
