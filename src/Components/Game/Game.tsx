import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { hitAction, resetGameAction, standAction } from '../../action';
import { ICard } from '../../cardModel';
import { IState, Status } from '../../reducer';
import "./Game.css";
import { Card } from '../Card/Card';
import axios from 'axios';

export interface IGameProps {
    player: any,
    playerSum: number,
    dealer: any,
    dealerSum: number
    hit(): void,
    stand(): void,
    resetGame(): void,
    status: any,
}

class _Game extends React.Component<IGameProps> {
  
    public render() {
        const { dealer, player, dealerSum, playerSum, status } = this.props;
        return (
            <div >
                <div style={{ margin: "auto" }}>
                    <Button disabled={status !== Status.InProgress}
                        size="sm" variant="light"
                        onClick={this.hitHandle}>
                        HIT
                        </Button>
                    <Button
                        disabled={status !== Status.InProgress}
                        onClick={this.standHandler}
                        size="sm" variant="light"
                        style={{ marginLeft: "5px" }}>
                        Stand
                        </Button>
                </div>
                <h2 style={{ marginBottom: "16px", marginTop: "26px" }}><u>Player Cards:</u></h2>
                <div>
                    {player.cards.map((card: ICard) =>
                        <Card key={card.id} {...card} />)}
                    <h4 style={{ margin: "17px" }}><u>Total Score :{playerSum}</u></h4>
                    <Modal show={status !== Status.InProgress}>
                        <Modal.Header >
                            <h5 style={{ margin: "auto" }}>{status}</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Button
                                onClick={this.newGameHandler}
                                style={{ marginLeft: "190px" }}
                                size="sm" variant="danger">
                                New Game
                            </Button>
                        </Modal.Body>
                    </Modal>
                </div>
                <div style={{ margin: "10px" }}>
                    <h2><u>Dealer Cards</u></h2>
                    {dealer.cards.map((card: ICard) =>
                        <Card key={card.id} {...card} />)}
                    <h4 ><u>Total Score :{dealerSum}</u></h4>
                </div>
            </div>
        );
    }
    hitHandle = () => {
        const { hit } = this.props;
        hit();
    }
    standHandler = () => {
        const { stand } = this.props;
        stand()
    }
    newGameHandler = () => {
        const { resetGame } = this.props;
        resetGame();
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
    hit: hitAction,
    stand: standAction,
    resetGame: resetGameAction,
}

export const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Game)
