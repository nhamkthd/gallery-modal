import { combineReducers } from "redux";
import { userLogin } from "./user/reducers";
import { gallery } from "./gallery/reducers";

const reducers = combineReducers({
    userLogin,
    gallery,
});

export default reducers;