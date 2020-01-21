import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DetailHeader from './DetailHeader';
import Detail from './Detail';
import DetailText from './DetailText';
import PropTypes from 'prop-types';
import { getCard, deleteCard } from '../../../actions/cards'
import { Redirect } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';


export class CardDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrer: null,
        }
    }

    static propTypes = {
        card: PropTypes.object.isRequired,
        getCard: PropTypes.func.isRequired,
        deleteCard: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.props.getCard(params.id);
    }

    handleDelete = id => {
        const { deleteCard, history } = this.props;
        deleteCard(id, history);
        this.setState({ referrer: '/cards' })
    }

    render() {
        const { referrer } = this.state;
        if (referrer) return <Redirect to={referrer} />
        let type = '';
        let date_cancelled = this.props.card.date_cancelled ? this.props.card.date_cancelled : 'Currently Active';
        switch (this.props.card.type) {
            case 1:
                type = 'Mastercard';
                break;
            case 2:
                type = 'Visa';
                break;
            case 3:
                type = 'American Express';
                break;
            default:
                type = 'Other'
        }
        if (this.props.card) {
            return (
                <Fragment>
                    <DetailHeader card={this.props.card} deleteHandler={this.handleDelete} />
                    <div className="row">
                        <Detail name='Credit Limit' value={`$${this.props.card.limit}`} icon='fas fa-user-lock' />
                        <Detail name='Annual Fee' value={`$${this.props.card.annualfee}`} icon='fas fa-dollar-sign' />
                        <Detail name='Card Type' value={type} icon='fas far fa-credit-card' />
                    </div>
                    <div className="row">
                        <Detail name='Activation Date' value={this.props.card.date_activated} icon='fas fa-calendar-check' />
                        <Detail name='Cancellation Date' value={date_cancelled} icon='fas fa-calendar-times' />
                        <Detail name='Reminder Date' value={this.props.card.date_reminder} icon='fas fa-calendar-plus' />
                    </div>
                    <div className="row">
                        <DetailText name='Incentive' text={this.props.card.incentive} />
                        <DetailText name='Notes' text={this.props.card.notes} />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
    }
}

// const mapStateToProps = (state, ownProps) => {
//     let id = ownProps.match.params.id;
//     return {
//         card: state.cards.cards.find(card => card.id == id)
//     }
// }

const mapStateToProps = state => ({
    card: state.cards.card
})

export default connect(mapStateToProps, { getCard, deleteCard })(CardDetails);
