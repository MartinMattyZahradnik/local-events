import { CHANGE_LOCALE } from "./constants";

export type AvailableLocales = "en" | "de";

export interface ILocalizationReducerState {
  locale: AvailableLocales;
}

export interface ChangeLocaleAction {
  type: typeof CHANGE_LOCALE;
  payload: AvailableLocales;
}

export type LocalizationReducerTypes = ChangeLocaleAction;
