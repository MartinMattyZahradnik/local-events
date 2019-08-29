import { IAction } from "redux/action";
import { actionTypes as localizationActionsTypes } from "redux/localization/constants";
import { ILocalizationReducerState, AvailableLocales } from "./types";

const defaultState: ILocalizationReducerState = {
  locale: "en"
};

function localizationReducer(
  state: ILocalizationReducerState = defaultState,
  { type, payload }: IAction<AvailableLocales>
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
