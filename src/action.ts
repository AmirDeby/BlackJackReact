import { IAction } from "./reducer"


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
export const resetGameAction = (): IAction => {
    return {
        type: "NEW_GAME",
        payload: {}
    }
}
