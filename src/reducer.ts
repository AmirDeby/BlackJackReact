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

const getInitialState = (): IState => {
    const stack = shuffle(cards);

    const dealerCards = stack.splice(0, 1);
    const dealerSum = sumBy(dealerCards, "number");

    const playerCards = stack.splice(0, 2);
    const playerSum = sumBy(playerCards, "number");
    const status = (playerSum === 21) ? Status.Win : Status.InProgress;

    return {
        player: { cards: playerCards },
        dealer: { cards: dealerCards },
        stack,
        dealerSum,
        playerSum,
        status,
    }
};

const whoIsTheWinner = (playerSum: number, dealerSum: number) => {
    if (playerSum > 21) return Status.Lose
    if (dealerSum > 21) return Status.Win
    if (dealerSum > playerSum) return Status.Lose
    if (dealerSum < playerSum) return Status.Win
    if (dealerSum === playerSum) return Status.Tie
}

export const reducer = (state = getInitialState(), action: IAction) => {
    switch (action.type) {

        case 'NEW_GAME': {
            return getInitialState();
        }
        case 'STAND': {
            const { dealer, stack, dealerSum, playerSum } = state;
            let dealerNewSum = dealerSum;
            let dealerCardsCopy = dealer.cards.concat();
            const newStack = stack.concat();
            while (dealerNewSum < 17) {
                const dealerNewCard = newStack.splice(0, 1);
                dealerCardsCopy.push(dealerNewCard[0]);
                dealerNewSum += dealerNewCard[0].number;
            }
            const status = whoIsTheWinner(playerSum, dealerNewSum);
            return {
                ...state,
                dealer: { ...dealer, cards: dealerCardsCopy },
                dealerSum: dealerNewSum,
                status
            }
        }
        case 'HIT': {
            const { player, stack, playerSum } = state;
            const newStack = stack.concat();
            const oneMoreCard = newStack.splice(0, 1);
            const newCard = oneMoreCard[0];
            const sum = newCard.number + playerSum;
            const status = sum > 21 ? Status.Lose : Status.InProgress;
            return {
                ...state,
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