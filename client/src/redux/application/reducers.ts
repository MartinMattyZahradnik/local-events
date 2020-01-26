import { combineReducers } from "redux";

import {
  FETCH_COUNTRY_LIST,
  FETCH_COUNTRY_LIST_SUCCESS,
  FETCH_COUNTRY_LIST_ERROR
} from "./constants";
import {
  ICountry,
  CountryListResultTypes,
  CountryListLoadingTypes,
  CountryListErrorTypes
} from "./types";

function error(state: number | null = null, action: CountryListErrorTypes) {
  switch (action.type) {
    case FETCH_COUNTRY_LIST_ERROR:
      return action.payload.statusCode;

    case FETCH_COUNTRY_LIST:
    case FETCH_COUNTRY_LIST_SUCCESS:
      return null;

    default:
      return state;
  }
}

function result(state: ICountry[] = [], action: CountryListResultTypes) {
  switch (action.type) {
    case FETCH_COUNTRY_LIST_SUCCESS:
      return action.payload.countries;

    case FETCH_COUNTRY_LIST_ERROR:
      return [];

    default:
      return state;
  }
}

function isLoading(state = false, action: CountryListLoadingTypes) {
  switch (action.type) {
    case FETCH_COUNTRY_LIST:
      return true;

    case FETCH_COUNTRY_LIST_SUCCESS:
    case FETCH_COUNTRY_LIST_ERROR:
      return false;

    default:
      return state;
  }
}

export interface ICountryListReducerState {
  isLoading: boolean;
  error: boolean;
  result: ICountry[];
}

export const countryListReducer = combineReducers({ error, result, isLoading });

export default combineReducers({
  countryList: countryListReducer
});
