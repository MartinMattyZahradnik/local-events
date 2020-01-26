import {
  FETCH_COUNTRY_LIST,
  FETCH_COUNTRY_LIST_SUCCESS,
  FETCH_COUNTRY_LIST_ERROR
} from "./constants";

export interface IState {
  code: string;
  name: string;
}

export interface ICountry extends IState {
  states?: IState[];
}

export type IApplicationReducerState = {
  countryList: {
    result: ICountry[];
    isLoading: boolean;
    error: boolean;
  };
};

export interface FetchCountyListAction {
  type: typeof FETCH_COUNTRY_LIST;
}

export interface FetchCountyListSuccessAction {
  type: typeof FETCH_COUNTRY_LIST_SUCCESS;
  payload: { countries: ICountry[] };
}

export interface FetchCountyListErrorAction {
  type: typeof FETCH_COUNTRY_LIST_ERROR;
  payload: { statusCode: number };
}

export type CountryListResultTypes =
  | FetchCountyListSuccessAction
  | FetchCountyListErrorAction;

export type CountryListLoadingTypes =
  | FetchCountyListAction
  | FetchCountyListSuccessAction
  | FetchCountyListErrorAction;

export type CountryListErrorTypes =
  | FetchCountyListAction
  | FetchCountyListSuccessAction
  | FetchCountyListErrorAction;
