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
    // { number: 10, image: "/cards/10.png" },
    { number: 10, image: "/cards/210.png" },
    // { number: 10, image: "/cards/11.png" },
    { number: 10, image: "/cards/211.png" },
    // { number: 10, image: "/cards/111.png" },
    { number: 10, image: "/cards/12.png" },
    { number: 10, image: "/cards/212.png" },
    // { number: 10, image: "/cards/112.png" },
    { number: 10, image: "/cards/13.png" },
    { number: 9, image: "/cards/9H.png" },
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
    Win = "win",
    Lose = 'lose',
    Tie = 'tie',
    InProgress = 'inProgress'
}

const initialState: IState = {
    player: { cards: [] },
    dealer: { cards: [] },
    stack: shuffle(cards),
    dealerSum: 0,
    playerSum: 0,
    status: Status.InProgress,
};
const whoIsTheWinner = (playerSum: number, dealerSum: number) => {
    if (playerSum > 21) return Status.Lose
    if (dealerSum > 21) return Status.Win
    if (dealerSum > playerSum) return Status.Lose
    if (dealerSum < playerSum) return Status.Win
    if (dealerSum === playerSum) return Status.Tie
}

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {

        case 'DEAL_DEALER': {
            const { dealer, stack } = state;
            const newStack = stack.concat();
            const dealerCard = newStack.splice(0, 1);
            const sum = sumBy(dealerCard, "number");
            const status = (sum === 21) ? Status.Lose : Status.InProgress;
            return {
                ...state,
                dealer: { ...dealer, cards: dealerCard },
                stack: newStack,
                dealerSum: sum,
                status
            }
        }
        case 'DEAL': {
            const { player, stack } = state;
            const newStack = stack.concat();
            const playerCards = newStack.splice(0, 2);
            const sum = sumBy(playerCards, "number");
            const status = (sum === 21) ? Status.Win : Status.InProgress;
            return {
                ...state,
                player: { ...player, cards: playerCards },
                stack: newStack,
                playerSum: sum,
                status,
            }
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
        case 'SUMMARY': {
            const { dealerSum, playerSum } = state;
            const status = whoIsTheWinner(playerSum, dealerSum);
            console.log(status);
            return {
                ...state,
                status,
            }
        }
        default: {
            return state;
        }
    }
}


// // TODO: remove this case and check the game in a different action
// case 'DEALER_SUM': {
//     const dealerCards = action.payload;
//     const sum = sumBy(dealerCards, "number");
//     return {
//         ...state,
//         dealerSum: sum
//     }
// }
// // TODO: remove this case and check the game in a different action
// case 'PLAYER_SUM': {
    //     const playerCards = action.payload;
    //     const sum = sumBy(playerCards, "number")
    //     return {
        //         ...state,
        //         playerSum: sum
        //     }
        // }