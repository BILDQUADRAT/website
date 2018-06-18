import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Link extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        onClick: PropTypes.func,
    }

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(e);
        }

        window.reactHistory.push(this.props.to);
    }

    render () {
        const {
            to,
            onClick,
            ...anchorProps
        } = this.props;

        return (
            <a href={to} onClick={this.handleClick} {...anchorProps} />
        )
    }
}

export default Link;