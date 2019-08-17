import { actionTypes as localizationActionsTypes } from "actions/localizationActions";

type availableLocales = "en" | "de";

const defaultState = {
  locale: "en"
};

type localizationAction = {
  type: string;
  payload: availableLocales;
};

function localizationReducer(
  state = defaultState,
  { type, payload }: localizationAction
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
