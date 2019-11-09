import { combineReducers } from "redux";

import { IAction } from "redux/action";
import { actionTypes as applicationActionTypes } from "./constants";
import { ICountryList } from "./types";

type IErrorPayload = true | false;

function error(state = false, { type, payload }: IAction<IErrorPayload>) {
  switch (type) {
    case applicationActionTypes.FETCH_COUNTRY_LIST_ERROR:
      return payload;

    case applicationActionTypes.FETCH_COUNTRY_LIST:
    case applicationActionTypes.FETCH_COUNTRY_LIST_SUCCESS:
      return false;

    default:
      return state;
  }
}

function result(state: ICountryList = [], { type, payload }: any) {
  switch (type) {
    case applicationActionTypes.FETCH_COUNTRY_LIST_SUCCESS:
      return payload.countries;

    case applicationActionTypes.FETCH_COUNTRY_LIST_ERROR:
      return [];

    default:
      return state;
  }
}

type IsLoadingPayload = true | false;

function isLoading(state = false, { type }: IAction<IsLoadingPayload>) {
  switch (type) {
    case applicationActionTypes.FETCH_COUNTRY_LIST:
      return true;

    case applicationActionTypes.FETCH_COUNTRY_LIST_SUCCESS:
    case applicationActionTypes.FETCH_COUNTRY_LIST_ERROR:
      return false;

    default:
      return state;
  }
}

export interface ICountryListReducerState {
  isLoading: boolean;
  error: boolean;
  result: ICountryList;
}

export const countryListReducer = combineReducers({ error, result, isLoading });

export default combineReducers({
  countryList: countryListReducer
});
