import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PageBase } from '../components/pagebase';
import { Banner, SHAPE_BANNER } from '../components/banner';
import { CollectionRepeater } from '../util/collection-repeater';
import { Spotlight } from '../components/spotlight';

export class SectionCollection extends Component {
    static propTypes = {
        content: PropTypes.shape({
            banner: PropTypes.shape(SHAPE_BANNER).isRequired,
        }).isRequired,
    }

    render () {
        const { banner } = this.props.content;

        return (
            <PageBase>
                {/*<Banner banner={banner} />*/}
                <div id="main">
                    <section className="spotlights">
                        <CollectionRepeater name="services" filterBy={{}}>
                            {({ content: { teaser = {} } = {}, url }, key) => (
                                <Spotlight
                                    key={key}
                                    image={teaser.image}
                                    imgUrl={url}
                                    headline={teaser.headline}
                                    copy={teaser.copy}
                                    actions={[{
                                        url,
                                        text: teaser.cta,
                                    }]}
                                />
                            )}
                        </CollectionRepeater>
                    </section>
                </div>
            </PageBase>
        );
    }
}

export default SectionCollection;