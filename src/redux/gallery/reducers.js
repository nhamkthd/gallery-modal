
import produce from "immer";
import { GET_PHOTOS_SUCCESS } from "./type";

export const gallery = (state = null, action) => {
    const nextState = produce(state, draftState => {
        if (action.type === GET_PHOTOS_SUCCESS) draftState = action.payload;
        return draftState;
    });
    return nextState;
};
