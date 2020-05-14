import { IAction } from "./reducer"


export const hitAction = ():IAction => {
    return {
        type: "HIT",
        payload: {},
    }
}


