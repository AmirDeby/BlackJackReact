import shuffle from "lodash.shuffle";
import { ICard } from "./cardModel";
import sumBy from 'lodash.sumby';

const cards = [
    { number: 11, image: "/cards/1.png" },
    { number: 2, image: "/cards/2.png" },
    { number: 3, image: "/cards/3.png" },
    { number: 4, image: "/cards/4.png" },
    { number: 5, image: "/cards/5.png" },
    { number: 6, image: "/cards/6.png" },
    { number: 7, image: "/cards/7.png" },
    { number: 8, image: "/cards/8.png" },
    { number: 9, image: "/cards/9.png" },
    { number: 10, image: "/cards/10.png" },
    { number: 10, image: "/cards/11.png" },
    { number: 10, image: "/cards/12.png" },
    { number: 10, image: "/cards/13.png" },
]

export interface IState {
    stack: ICard[],
    player: { cards: ICard[] },
    dealer: [],
    playerSum: number,
}

export interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    player: { cards: [] },
    dealer: [],
    stack: shuffle(cards),
    playerSum: 0,
};

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case 'HIT': {
            const cards = action.payload;
            const { player } = state;
            player.cards.push(cards[0])
            player.cards.push(cards[3])
            return {
                ...state,
                player: player,
            }
        }
        case 'ANOTHER_HIT': {
            const { player } = state;
            const cards = action.payload;
            player.cards.push(cards[1]);
            return {
                ...state,
                player: player
            }
        }
        case 'PLAYER_SUM': {
            const playerCards = action.payload;
            const sum = sumBy(playerCards, "number")
            return {
                ...state,
                playerSum: sum
            }
        }
        default: {
            return state;
        }
    }
}