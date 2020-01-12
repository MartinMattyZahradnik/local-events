import { createSelector } from "reselect";
import { AvailableLocales } from "redux/localization/types";

import { IState } from "redux/rootReducer";
import { CHANGE_LOCALE } from "redux/localization/constants";
import { ChangeLocaleAction } from "./types";

export const changeLocale = (
  newLocale: AvailableLocales
): ChangeLocaleAction => ({
  type: CHANGE_LOCALE,
  payload: newLocale
});

const getLocalization = (state: IState) => state.localization;

export const selectLocale = createSelector(
  getLocalization,
  (localizationState: { locale: AvailableLocales }) => localizationState.locale
);
