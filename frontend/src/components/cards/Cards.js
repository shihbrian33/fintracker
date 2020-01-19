import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCards, deleteCard } from '../../actions/cards';

function IconClass(type) {
    switch (type) {
        case 1:
            return 'fab fa-cc-mastercard'
        case 2:
            return 'fab fa-cc-visa'
        case 3:
            return 'fab fa-cc-amex'
        case 4:
            return 'fas fa-credit-card'
        default:
            return null;
    }
}

export class Cards extends Component {
    static propTypes = {
        cards: PropTypes.array.isRequired,
        getCards: PropTypes.func.isRequired,
        deleteCard: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getCards();
    }

    render() {
        return (
            <div className="collapse show" id={this.props.active ? 'ActiveCards' : 'CancelledCards'}>
                <div className="row">
                    {this.props.cards.filter(card => {
                        if (this.props.active)
                            return !card.date_cancelled;
                        else
                            return card.date_cancelled;
                    }).map(card => (
                        <div className="col-xl-3 col-sm-6 my-3" key={card.id}>
                            <div className={"card text-white o-hidden vh-15 " + (this.props.active ? 'bg-active' : 'bg-inactive')}>
                                <a className="card-body stretched-link text-decoration-none text-white" href="#">
                                    <div className="card-body-icon">
                                        <i className={IconClass(card.type)}> </i>
                                    </div>
                                    <div className="mr-5"><h5>{card.name}</h5></div>
                                </a>
                                <a className="card-footer stretched-link text-white clearfix small z-1" href="#">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fas fa-angle-right"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                    {this.props.active == true &&
                        <div className="col-xl-3 col-sm-6 my-3">
                            <div className="card text-white bg-newcard o-hidden vh-15">
                                <a className="card-body stretched-link text-decoration-none text-white" href="#">
                                    <div className="card-body-icon unrotate">
                                        <i className="fas fa-fw fa-plus"> </i>
                                    </div>
                                    <div className="mr-5"><h4>Add a New Card</h4></div>
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cards: state.cards.cards
})

export default connect(mapStateToProps, { getCards, deleteCard })(Cards);
