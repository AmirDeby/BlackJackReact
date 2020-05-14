import * as React from 'react';
import { connect } from 'react-redux';
import { hitAction } from '../../action';
import { ICard } from '../../cardModel';
import { IState, Status } from '../../reducer';
import Button from 'react-bootstrap/Button'

export interface IGameProps {
    player: any,
    playerSum: number,
    dealer: any,
    dealerSum: number
    hit(): void,
    status: any,
}


class _Game extends React.Component<IGameProps> {
    public render() {
        const { dealer, player, dealerSum, playerSum, status } = this.props;
        return (
            <div>
                <h2><u>Player Cards:</u></h2>
                <div style={{ margin: "17px" }}>
                    <Button disabled={status !== Status.InProgress} size="sm" variant="light" onClick={this.hitHandle}>HIT</Button>
                    <Button size="sm" variant="light" style={{ marginLeft: "5px" }}>Stand</Button>
                </div>
                {player.cards.map((card: ICard) => <img key={card.image} style={{ margin: "5px", width: "110px" }} alt="" src={card.image} />)}
                <h4 style={{ margin: "17px" }}><u>Total Score :{playerSum}</u></h4>
                <div style={{ margin: "17px" }}>
                    <h2>Dealer Cards</h2>
                    {dealer.cards.map((card: ICard) =>
                        <img key={card.image} style={{ margin: "5px", width: "110px" }} alt="" src={card.image} />
                    )}
                    <h4 ><u>Total Score :{dealerSum}</u></h4>
                </div>
                <div>
                    {status}
                </div>
            </div>
        );
    }
    hitHandle = () => {
        const { hit } = this.props;
        hit();
    }
}

const mapStateToProps = (state: IState) => {
    return {
        player: state.player,
        dealer: state.dealer,
        playerSum: state.playerSum,
        dealerSum: state.dealerSum,
        status: state.status
    }
}

const mapDispatchToProps = {
    hit: hitAction
}

export const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Game)
