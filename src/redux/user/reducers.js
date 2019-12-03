import { LOGIN_SUCCESS, LOGOUT_SUCCESS, CLEAR_ALL_STATE } from "./types";
import produce from "immer";

export const userLogin = (state = null, action) => {
  const nextState = produce(state, draftState => {
    if (action.type === LOGIN_SUCCESS) draftState = action.payload;
    if (action.type === LOGOUT_SUCCESS) draftState = null;
    if (action.type === CLEAR_ALL_STATE) draftState = null;
    return draftState;
  });
  return nextState;
};
