import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(
    state => ({
        content: state.content,
    })
)
export class Banner extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
    }

    render() {
        const { banner_headline, banner_subheader, banner_cta } = this.props.content;
        return (
            <section id="banner" className="major">
                <div className="inner">
                    <header className="major">
                        <h1>{banner_headline}</h1>
                    </header>
                    <div className="content">
                        <p>{banner_subheader}</p>
                        <ul className="actions">
                            <li><a href="#one" className="button next scrolly">{banner_cta}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default Banner;
