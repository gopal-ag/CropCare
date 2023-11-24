import {
  CLEAR_MESSAGE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import * as auth from "../../api/api";

export const login = (values) => (dispatch) => {
  return auth.login(values).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: CLEAR_MESSAGE,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  auth.logout();

  dispatch({
    type: LOGOUT,
  });
};
