import {
  FETCH_COUNTRY_LIST,
  FETCH_COUNTRY_LIST_SUCCESS,
  FETCH_COUNTRY_LIST_ERROR
} from "./constants";
import {
  ICountry,
  FetchCountyListAction,
  FetchCountyListSuccessAction,
  FetchCountyListErrorAction
} from "./types";

/*** ===  FETCH COUNTRY LIST  === ***/
export const fetchCountryList = (): FetchCountyListAction => ({
  type: FETCH_COUNTRY_LIST
});

export const fetchCountyListSuccess = (
  countries: ICountry[]
): FetchCountyListSuccessAction => ({
  type: FETCH_COUNTRY_LIST_SUCCESS,
  payload: { countries }
});

export const fetchCountyListError = (
  statusCode: number
): FetchCountyListErrorAction => ({
  type: FETCH_COUNTRY_LIST_ERROR,
  payload: { statusCode }
});
