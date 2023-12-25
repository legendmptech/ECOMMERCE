import { combineReducers } from "redux";
import ui from "./ui";
import auth from "./auth";
import entities from "./entities";

export default combineReducers({
  ui: ui,
  auth: auth,
  entities: entities,
});
