import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";

const getUserData = (state: IState) => state.user;

export const selectUser = createSelector(
  getUserData,
  userData => userData.result
);

export const selectUserIsLoading = createSelector(
  getUserData,
  userData => userData.isLoading
);

export const selectUserError = createSelector(
  getUserData,
  userData => userData.error
);
