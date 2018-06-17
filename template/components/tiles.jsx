import React from 'react';
import PropTypes from 'prop-types';

export const Tile = props => (
    <article>
        {props.imageSource ? (
            <span className="image">
                <img src={props.imageSource} alt={props.imageAlt} />
            </span>
        ) : null}
        <header className="major">
            <h3><a href={props.link} className="link">{props.headline}</a></h3>
            <p>{props.copy}</p>
        </header>
    </article>
);
Tile.propTypes = {
    imageSource: PropTypes.string,
    imageAlt: PropTypes.string,
    link: PropTypes.string,
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string,
}

export const TileSection = props => (
    <section className="tiles" {...props} />
);
