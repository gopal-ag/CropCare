import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./messageReducer";

export default combineReducers({
  auth,
  message,
});
