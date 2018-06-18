import React from 'react';
import { Banner } from '../components/banner';
import PageBase from '../components/pagebase';
import PropTypes from 'prop-types';
import { CollectionRepeater } from '../util/collection-repeater';
import { TileSection, Tile } from '../components/tiles';

export class HomePage extends React.Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
    }

    render () {
        const {
            banner
        } = this.props.content;

        return (
            <PageBase>
                <Banner banner={banner}/>
                <div id="main">
                    <TileSection id="one">
                        <CollectionRepeater name="sections">
                            {(page, key) => (
                                <Tile
                                    key={key}
                                    headline={page.content.headline}
                                    copy="Hallo Welt"
                                    link={page.url}
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
