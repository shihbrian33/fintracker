import { combineReducers } from "redux";
import cards from "./cards";
import auth from "./auth";
import messages from "./messages";
import errors from "./errors";

export default combineReducers({
  cards,
  auth,
  messages,
  errors
});
