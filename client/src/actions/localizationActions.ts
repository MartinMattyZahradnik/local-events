import { createSelector } from "reselect";
import { availableLocales } from "localization";

export const actionTypes = {
  CHANGE_LOCALE: "localization/CHANGE_LOCALE"
};

export const changeLocale = (newLocale: availableLocales) => ({
  type: actionTypes.CHANGE_LOCALE,
  payload: newLocale
});

const getLocalization = (state: any) => state.localization;

export const selectLocale = createSelector(
  getLocalization,
  (localizationState: { locale: availableLocales }) => localizationState.locale
);
