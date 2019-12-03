import {
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CLEAR_ALL_STATE
  } from "./types";
  import { login, me, logout, changePassword } from "../../common/api";
  import emitter from "../../common/event";
  
  export function actionClearState() {
    return {
      type: CLEAR_ALL_STATE
    };
  }
  
  export function actionLogin(data) {
    return async dispatch => {
      try {
        let res = await login(data);
  
        const token = res.data.access_token;
        const expires_in = res.data.expires_in;
        const token_type = res.data.token_type;
  
        res = await me(token);
  
        const userLogin = res.data;
  
        userLogin.token = token;
        userLogin.expires_in = expires_in;
        userLogin.token_type = token_type;
  
        dispatch({
          type: LOGIN_SUCCESS,
          payload: userLogin
        });
      } catch (error) {
        emitter.emit(LOGIN_FAIL, error);
      }
    };
  }
  
  export function actionLogout() {
    return async dispatch => {
      try {
        await logout();
      } catch (error) {}
      emitter.emit(LOGOUT_SUCCESS)
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: null
      });
    };
  }
  
  export function actionChangePassword(data) {
    return async dispatch => {
      try {
        const res = await changePassword(data);
        emitter.emit(CHANGE_PASSWORD_SUCCESS, res);
      } catch (error) {
        emitter.emit(CHANGE_PASSWORD_FAIL, error);
      }
    };
  }
  