import React from 'react';
import Header from '../components/header';
import Menu from '../components/menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(
    state => ({
        menuOpen: state.menuOpen,
    })
)
export default class PageBase extends React.Component {
    static propTypes = {
        menuOpen: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
    }

    componentDidMount () {
        setTimeout(() => document.body.classList.remove('is-preload'), 100);
    }

    render () {
        return (
            <React.Fragment>
                <div id="wrapper" className={this.props.menuOpen ? 'menu-visible' : ''}>
                    <Header />
                    {this.props.children}
                </div>
                <Menu />
            </React.Fragment>
        )
    }
}
