import { actionTypes } from "./constants";
import { ICountryList } from "./types";

/*** ===  FETCH COUNTRY LIST  === ***/
export const fetchCountryList = () => ({
  type: actionTypes.FETCH_COUNTRY_LIST
});

export const fetchCountyListSuccess = (countries: ICountryList) => ({
  type: actionTypes.FETCH_COUNTRY_LIST_SUCCESS,
  payload: { countries }
});

export const fetchCountyListError = (statusCode: number) => ({
  type: actionTypes.FETCH_COUNTRY_LIST_ERROR,
  payload: { statusCode }
});
