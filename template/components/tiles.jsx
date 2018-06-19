import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../util/link';

export const Tile = props => (
    <article style={props.image ? { backgroundImage: `url(${props.image})` } : {}}>
        <header className="major">
            <h3>
                <Link to={props.link} className="link">{props.headline}</Link>
            </h3>
            <p>{props.copy}</p>
        </header>
        <Link to={props.link} className="link primary" />
    </article>
);

Tile.propTypes = {
    image: PropTypes.string,
    url: PropTypes.string,
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string,
}

Tile.defaultProps = {
    image: "",
    url: "",
    headline: "",
    copy: "",
}

export const TileSection = props => (
    <section className="tiles" {...props} />
);
