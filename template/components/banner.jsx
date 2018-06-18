import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SHAPE_BANNER = {
    headline: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
    image: PropTypes.image,
};

export class Banner extends Component {
    static propTypes = {
        banner: PropTypes.shape(SHAPE_BANNER),
    }

    static defaultProps = {
        image: false,
    }

    render() {
        const { headline, subheader, cta, image } = this.props.banner;
        return (
            <section id="banner" className="major" style={image ? {backgroundImage: `url(${image})`} : {}}>
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
