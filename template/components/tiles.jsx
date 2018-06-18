import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../util/link';

export const Tile = props => (
    <article>
        {props.imageSource ? (
            <span className="image">
                <img src={props.imageSource} alt={props.imageAlt} />
            </span>
        ) : null}
        <header className="major">
            <h3>
                <Link to={props.link} className="link">{props.headline}</Link>
            </h3>
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
