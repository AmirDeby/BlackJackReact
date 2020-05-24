import { IAction } from "./reducer"

export const restartGameAction = (): IAction => {
    return {
        type: "RESTART_GAME",
        payload: {}
    }
}
export const hitAction = (): IAction => {
    return {
        type: "HIT",
        payload: {},
    }
}
export const standAction = (): IAction => {
    return {
        type: "STAND",
        payload: {}
    }
}
export const newGameAction = (): IAction => {
    return {
        type: "NEW_GAME",
        payload: {}
    }
}
export const sendABidAction = (bid: number): IAction => {
    return {
        type: 'PLACE_A_BID',
        payload: bid
    }
}
