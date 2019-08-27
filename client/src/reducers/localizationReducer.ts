import { IAction } from "store/action";
import { actionTypes as localizationActionsTypes } from "actions/localizationActions";

export type availableLocales = "en" | "de";

export interface ILocalizationReducerState {
  locale: availableLocales;
}

const defaultState: ILocalizationReducerState = {
  locale: "en"
};

type LocalizationReducerPayload = availableLocales;

function localizationReducer(
  state: ILocalizationReducerState = defaultState,
  { type, payload }: IAction<LocalizationReducerPayload>
) {
  switch (type) {
    case localizationActionsTypes.CHANGE_LOCALE:
      return {
        ...state,
        locale: payload
      };

    default:
      return state;
  }
}

export default localizationReducer;
