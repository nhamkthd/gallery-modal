import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./rootReducers";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();

const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    userLogin: store.getState().userLogin
  });
});

export default store;
