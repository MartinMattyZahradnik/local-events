import { createSelector } from "reselect";
import { AvailableLocales } from "redux/localization/types";

import { IState } from "redux/rootReducer";
import { actionTypes } from "redux/localization/constants";

export const changeLocale = (newLocale: AvailableLocales) => ({
  type: actionTypes.CHANGE_LOCALE,
  payload: newLocale
});

const getLocalization = (state: IState) => state.localization;

export const selectLocale = createSelector(
  getLocalization,
  (localizationState: { locale: AvailableLocales }) => localizationState.locale
);
