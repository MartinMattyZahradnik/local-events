import { createSelector } from "reselect";

import { IState } from "redux/rootReducer";
import { CHANGE_LOCALE } from "redux/localization/constants";
import { ChangeLocaleAction, AvailableLocales } from "./types";

export const changeLocale = (
  newLocale: AvailableLocales
): ChangeLocaleAction => ({
  type: CHANGE_LOCALE,
  payload: newLocale
});

const getLocalization = (state: IState) => state.localization;

export const selectLocale = createSelector(
  getLocalization,
  (localizationState: { locale: AvailableLocales }): AvailableLocales =>
    localizationState.locale
);
