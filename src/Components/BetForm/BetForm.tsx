import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { sendABidAction } from '../../action';
import { IState } from '../../reducer';

export interface IBetFormProps {
    moneyBid?(bid: number): void,
    amount?: number,
    reduxBid: number,
}

interface IBetFormState {
    bid: number,
}

class _BetForm extends React.Component<IBetFormProps> {
    state: IBetFormState = {
        bid: 0,
    }
    public render() {
        const { amount, reduxBid } = this.props;
        const { bid } = this.state
        return (
            <Form onSubmit={this.onSubmit} style={{ margin: "10px" }}>
                <Col>
                    <h4>Your Money :{amount}</h4>                   
                        <Form.Control
                        onChange={this.handlerChange} style={{ width: "5%", margin: "auto" }}
                        size="sm" name="bid" type="number" value={bid} placeholder="place a Bet" />
                    <Button
                        disabled={reduxBid > 0}
                        style={{ margin: "10px" }} size="sm"
                        type="submit" variant="success">Bid</Button>
                </Col>
            </Form>
        );
    }
    resetForm = () => {

    }
    handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }
    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { moneyBid } = this.props;
        const { bid } = this.state;
        moneyBid(bid);
        this.setState({
            bid: 0
        })
    }
}
const mapStateToProps = (state: IState) => {
    return {
        amount: state.amount,
        reduxBid: state.bid
    }
}
const mapDispatchToProps = {
    moneyBid: sendABidAction
}
export const BetForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BetForm);
