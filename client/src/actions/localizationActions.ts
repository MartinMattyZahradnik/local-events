import { createSelector } from "reselect";
import { availableLocales } from "localization";

import { IState } from "reducers/rootReducer";

export const actionTypes = {
  CHANGE_LOCALE: "localization/CHANGE_LOCALE"
};

export const changeLocale = (newLocale: availableLocales) => ({
  type: actionTypes.CHANGE_LOCALE,
  payload: newLocale
});

const getLocalization = (state: IState) => state.localization;

export const selectLocale = createSelector(
  getLocalization,
  (localizationState: { locale: availableLocales }) => localizationState.locale
);
