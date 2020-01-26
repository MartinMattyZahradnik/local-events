import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";
import { ICountry } from "./types";

const getApplicationState = (state: IState) => state.application;

export const selectCountryState = createSelector(
  getApplicationState,
  application => application.countryList
);

export const selectCountryList = createSelector(
  selectCountryState,
  (countries): ICountry[] => countries.result
);

export const selectCountryListIsLoading = createSelector(
  selectCountryState,
  (countries): boolean => countries.isLoading
);

export const selectCountryListError = createSelector(
  selectCountryState,
  countries => countries.error
);

export const makeSelectCountryByCode = (code: string) =>
  createSelector(selectCountryList, countryList =>
    countryList.find(country => country.code === code)
  );

export const makeSelectCountryNameByCode = (code: string) =>
  createSelector(selectCountryList, (countryList = []): string | null => {
    const country = countryList.find(country => country.code === code);
    return country && country.name ? country.name : null;
  });
