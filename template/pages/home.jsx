import React from 'react';
import { Banner, SHAPE_BANNER } from '../components/banner';
import PageBase from '../components/pagebase';
import PropTypes from 'prop-types';
import { CollectionRepeater } from '../util/collection-repeater';
import { TileSection, Tile } from '../components/tiles';

export class HomePage extends React.Component {
    static propTypes = {
        content: PropTypes.shape({
            banner: PropTypes.shape(SHAPE_BANNER).isRequired,
        }).isRequired,
    }

    render () {
        const {
            banner
        } = this.props.content;

        return (
            <PageBase>
                <Banner banner={banner} />
                <div id="main">
                    <TileSection id="one">
                        <CollectionRepeater name="sections">
                            {({ content: { teaser = {} } = {}, url }, key) => (
                                <Tile
                                    key={key}
                                    headline={teaser.headline}
                                    copy={teaser.copy}
                                    image={teaser.image}
                                    link={url}
                                />
                            )}
                        </CollectionRepeater>
                    </TileSection>
                </div>
            </PageBase>
        )
    }
}

export default HomePage;
