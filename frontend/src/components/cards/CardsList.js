import React, { Component, Fragment } from 'react'
import CardSection from './CardSection';

export class CardsList extends Component {
    render() {
        return (
            <Fragment>
                <CardSection active={true} />
                <CardSection active={false} />
            </Fragment>
        )
    }
}

export default CardsList
