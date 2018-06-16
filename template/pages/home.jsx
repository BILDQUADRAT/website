import React from 'react';
import { Banner } from '../components/banner';
import PageBase from '../components/pagebase';
import { connect } from 'react-redux';

@connect(
    state => ({
        content: state.content,
    })
)
export default class HomePage extends React.Component {
    render () {
        return (
            <PageBase>
                <Banner/>
                <div id="main">

                </div>
            </PageBase>
        )
    }
}