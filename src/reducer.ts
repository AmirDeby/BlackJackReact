import { ICard } from "./cardModel";
import shuffle from "lodash.shuffle";

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
    player: [],
    dealer: [],
}

export interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    player: [],
    dealer: [],
    stack:shuffle(cards),
};

export const reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}