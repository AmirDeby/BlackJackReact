import shuffle from "lodash.shuffle";
import { ICard } from "./cardModel";
import sumBy from 'lodash.sumby';
import { cards } from './cards';


export interface IState {
    stack: ICard[],
    player: { cards: ICard[] },
    dealer: { cards: ICard[] },
    dealerSum: number,
    playerSum: number,
    status: Status,
    amount: number,
    bid: number,
    show: boolean,
}
//  Record<string, any> תאור של אוייבקט חופשי
export interface IAction {
    type: string;
    payload: Record<string, any> | any;
}

export enum Status {
    Win = "You Win",
    Lose = 'You Lose',
    Tie = 'A Tie',
    InProgress = 'inProgress'
}
const getInitialState = (resetAmount: boolean): IState => {
    const stack = shuffle(cards);

    const dealerCards = stack.splice(0, 1);
    const dealerSum = sumBy(dealerCards, "number");

    const playerCards = stack.splice(0, 2);
    const playerSum = sumBy(playerCards, "number");
    const status = (playerSum === 21) ? Status.Win : Status.InProgress;
    const initialState: Partial<IState> = {
        player: { cards: playerCards },
        dealer: { cards: dealerCards },
        stack,
        dealerSum,
        playerSum,
        status,
        bid: 0,
        show: false,
    }
    if (resetAmount) {
        initialState.amount = 100;
    }
    return initialState as IState;
};

const whoIsTheWinner = (playerSum: number, dealerSum: number) => {
    if (playerSum > 21) return Status.Lose
    if (dealerSum > 21) return Status.Win
    if (dealerSum > playerSum) return Status.Lose
    if (dealerSum < playerSum) return Status.Win
    if (dealerSum === playerSum) return Status.Tie
}

export const reducer = (state = getInitialState(true), action: IAction) => {
    switch (action.type) {

        case 'SHOW_BUTTONS': {
            return {
                ...state,
                show: true
            }
        }
        case 'HIDE_BUTTONS': {
            return {
                ...state,
                show: false
            }
        }
        case 'PLACE_A_BID': {
            const bid = parseInt(action.payload);
            return {
                ...state,
                amount: state.amount - bid,
                bid
            }
        }
        case "RESTART_GAME": {
            return {
                ...state,
                ...getInitialState(true),
            }
        }

        case 'NEW_GAME': {
            return {
                ...state,
                ...getInitialState(false),
            }
        }
        case 'STAND': {
            const { dealer, stack, dealerSum, playerSum, amount, bid } = state;
            let dealerNewSum = dealerSum;
            let dealerCardsCopy = dealer.cards.concat();
            const newStack = stack.concat();
            while (dealerNewSum < 17) {
                const dealerNewCard = newStack.splice(0, 1);
                dealerCardsCopy.push(dealerNewCard[0]);
                dealerNewSum += dealerNewCard[0].number;
            }
            const status = whoIsTheWinner(playerSum, dealerNewSum);
            let newAmount = amount;
            if (status === Status.Win) {
                newAmount = amount + (2 * bid)
            } else if (status === Status.Tie) {
                newAmount = amount + bid
            }
            return {
                ...state,
                dealer: { ...dealer, cards: dealerCardsCopy },
                dealerSum: dealerNewSum,
                status,
                amount: newAmount
            }
        }
        case 'HIT': {
            const { player, stack, playerSum } = state;

            const oneMoreCard = stack.splice(0, 1);
            const newCard = oneMoreCard[0];
            const sum = newCard.number + playerSum;
            const status = sum > 21 ? Status.Lose : Status.InProgress;
            return {
                ...state,
                stack,
                player: { ...player, cards: [...player.cards, newCard] },
                playerSum: sum,
                status
            }
        }
        default: {
            return state;
        }
    }
}