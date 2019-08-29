import { createSelector } from "reselect";

// Types
import { IState } from "redux/rootReducer";
import { IUser } from "./types";

// Constatns
import { actionTypes } from "redux/user/constants";

export const fetchUser = () => ({
  type: actionTypes.FETCH_USER
});

export const fetchUserSucces = (payload: IUser[]) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload
});

export const fetchUserError = (payload: any) => ({
  type: actionTypes.FETCH_USER_ERROR,
  payload
});

const getUser = (state: IState) => state.user.result;
export const selectUser = createSelector(
  getUser,
  userState => userState
);
