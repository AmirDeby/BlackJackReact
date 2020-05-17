import shuffle from "lodash.shuffle";
import { ICard } from "./cardModel";
import sumBy from 'lodash.sumby';

const cards = [
    { id: 1, number: 11, image: "/cards/1.png" },
    { id: 2, number: 11, image: "/cards/1ג.png" },
    { id: 3, number: 11, image: "/cards/1h.png" },
    { id: 4, number: 11, image: "/cards/1q.png" },
    { id: 5, number: 2, image: "/cards/2.png" },
    { id: 6, number: 2, image: "/cards/2c.png" },
    { id: 7, number: 2, image: "2q" },
    { id: 8, number: 3, image: "/cards/3.png" },
    { id: 9, number: 3, image: "/cards/3c.png" },
    { id: 10, number: 3, image: "/cards/3h.png" },
    { id: 11, number: 3, image: "/cards/3q.png" },
    { id: 12, number: 4, image: "/cards/4.png" },
    { id: 13, number: 4, image: "/cards/4d.png" },
    { id: 14, number: 4, image: "/cards/4c.png" },
    { id: 15, number: 5, image: "/cards/5c.png" },
    { id: 16, number: 5, image: "/cards/5d.png" },
    { id: 17, number: 5, image: "/cards/5q.png" },
    { id: 18, number: 6, image: "/cards/6.png" },
    { id: 19, number: 6, image: "/cards/6c.png" },
    { id: 20, number: 6, image: "/cards/6d.png" },
    { id: 21, number: 7, image: "/cards/7c.png" },
    { id: 22, number: 7, image: "/cards/7.png" },
    { id: 23, number: 7, image: "/cards/7h.png" },
    { id: 24, number: 8, image: "/cards/8.png" },
    { id: 25, number: 8, image: "/cards/8c.png" },
    { id: 26, number: 8, image: "/cards/8h.png" },
    { id: 27, number: 9, image: "/cards/9.png"  },
    { id: 28, number: 9, image: "/cards/9d.png"  },
    { id: 29, number: 9, image: "/cards/9H.png" },
    { id: 30, number: 9, image: "/cards/9q.png" },
    { id: 31, number: 10, image: "/cards/10.png" },
    { id: 32, number: 10, image: "/cards/10h.png" },
    { id: 3, number: 10, image: "/cards/10d.png" },
]

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
