import { combineReducers } from "redux";

import userReducers from "reducers/userReducer";

export default combineReducers({
  user: userReducers
});
