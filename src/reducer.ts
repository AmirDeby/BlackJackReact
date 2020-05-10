import shuffle from "lodash.shuffle";
import { ICard } from "./cardModel";
import sumBy from 'lodash.sumby';

const cards = [
    { number: 11, image: "/cards/201.png" },
    { number: 11, image: "/cards/1.png" },
    { number: 2, image: "/cards/2.png" },
    { number: 2, image: "/cards/102.png" },
    { number: 3, image: "/cards/3.png" },
    { number: 3, image: "/cards/103.png" },
    { number: 3, image: "/cards/303.png" },
    { number: 4, image: "/cards/4.png" },
    { number: 4, image: "/cards/204.png" },
    { number: 5, image: "/cards/5.png" },
    { number: 5, image: "/cards/205.png" },
    { number: 5, image: "/cards/105.png" },
    { number: 6, image: "/cards/6.png" },
    { number: 6, image: "/cards/106.png" },
    { number: 6, image: "/cards/206.png" },
    { number: 7, image: "/cards/7.png" },
    { number: 8, image: "/cards/8.png" },
    { number: 9, image: "/cards/9.png" },
    { number: 9, image: "/cards/209.png" },
    { number: 10, image: "/cards/10.png" },
    { number: 10, image: "/cards/210.png" },
    { number: 10, image: "/cards/11.png" },
    { number: 10, image: "/cards/211.png" },
    { number: 10, image: "/cards/111.png" },
    { number: 10, image: "/cards/12.png" },
    { number: 10, image: "/cards/212.png" },
    { number: 10, image: "/cards/112.png" },
    { number: 10, image: "/cards/13.png" },
    { number: 9, image: "/cards/9H.png" },
]

export interface IState {
    stack: ICard[],
    player: { cards: ICard[] },
    dealer: { dealerCards: ICard[] },
    dealerSum: number,
    playerSum: number,
    status: string,
}

export interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    player: { cards: [] },
    dealer: { dealerCards: [] },
    stack: shuffle(cards),
    dealerSum: 0,
    playerSum: 0,
    status: "",
};

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case 'DEAL_DEALER': {
            const cards = action.payload;
            const { dealer, dealerSum } = state;
            const randomNum = Math.floor(Math.random() * 30);
            dealer.dealerCards.push(cards[randomNum]);
            return {
                ...state,
                dealer,
            }
        }
        case 'DEAL': {
            const cards = action.payload;
            const { player } = state;
            player.cards.push(cards[0])
            player.cards.push(cards[3])
            return {
                ...state,
                player: player,
            }
        }
        case 'HIT': {
            const { player } = state;
            const cards = action.payload;
            player.cards.push(cards[1]);
            return {
                ...state,
                player: player
            }
        }
        case 'DEALER_SUM': {
            const dealerCards = action.payload;
            const sum = sumBy(dealerCards, "number");
            return {
                ...state,
                dealerSum: sum
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
        case 'COMPARE': {
            const whoIsTheWinner = () => {
                const { dealerSum, playerSum } = state;
                if (playerSum > 21) return "you Lose"
                if (dealerSum > 21) return "you win"
                if (dealerSum > playerSum) return "you Lose"
                if (dealerSum < playerSum) return "you win"
                if (dealerSum === playerSum) return "Draw"
            }
            return {
                ...state,
                status: whoIsTheWinner()
            }
        }
        default: {
            return state;
        }
    }
}