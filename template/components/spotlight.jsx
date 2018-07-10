import React from 'react';
import { Link } from '../util/link';
import PropTypes from 'prop-types';

const renderActions = actions => {
    return (
        <ul className="actions">
            {actions.map(({ text = '', url = '' }) => (
            <li>
                <Link to={url} className="button">{text}</Link>
            </li>
            ))}
        </ul>
    );
}

export const Spotlight = props => {
    const image = props.image ? <img src={props.image} data-position="center center" /> : null;

    return (
        <section>
            {props.imgUrl
                ? <Link to={props.imgUrl} className="image">{image}</Link>
                : <a className="image">{image}</a>
            }
            <div className="content">
                <div className="inner">
                    <header className="major">
                        <h3>{props.headline}</h3>
                    </header>
                    {props.copy && <p>{props.copy}</p>}
                    {props.actions && renderActions(props.actions)}
                </div>
            </div>
        </section>
    );
}

Spotlight.propTypes = {
    image: PropTypes.string,
    imgUrl: PropTypes.string,
    headline: PropTypes.string.isRequired,
    copy: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })),
}

Spotlight.defaultProps = {
    image: "",
    imgUrl: "",
    headline: "",
    copy: "",
    actions: [],
}

export default Spotlight;
