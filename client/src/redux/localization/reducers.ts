import { CHANGE_LOCALE } from "redux/localization/constants";
import { ILocalizationReducerState, LocalizationReducerTypes } from "./types";

const defaultState: ILocalizationReducerState = {
  locale: "en"
};

function localizationReducer(
  state: ILocalizationReducerState = defaultState,
  action: LocalizationReducerTypes
) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload
      };

    default:
      return state;
  }
}

export default localizationReducer;
