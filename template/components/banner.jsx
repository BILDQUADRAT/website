import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Banner extends Component {
    static propTypes = {
        banner: PropTypes.shape({
            headline: PropTypes.string.isRequired,
            subheader: PropTypes.string.isRequired,
            cta: PropTypes.string.isRequired,
        }),
    }

    render() {
        const { headline, subheader, cta, image } = this.props.banner;
        return (
            <section id="banner" className="major">
                <div className="inner">
                    <header className="major">
                        <h1>{headline}</h1>
                    </header>
                    <div className="content">
                        <p>{subheader}</p>
                        <ul className="actions">
                            <li><a href="#one" className="button next scrolly">{cta}</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default Banner;
