import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";

const getUserData = (state: IState) => state.user;

export const selectUser = createSelector(
  getUserData,
  userData => userData.result
);

export const selectUserIsLoading = createSelector(
  getUserData,
  userData => userData.isLoading
);

export const selectUserError = createSelector(
  getUserData,
  userData => userData.error
);

export const selectUserImage = createSelector(
  selectUser,
  user => {
    if (!user) {
      return "defaultUserAvatarOther.png";
    }

    if (!user.image && user.gender === "male") {
      return "defaultUserAvatarMale.jpg";
    }

    if (!user.image && user.gender === "female") {
      return "defaultUserAvatarFemale.png";
    }

    if (!user.image && user.gender === "other") {
      return "defaultUserAvatarOther.png";
    }

    return user.image;
  }
);

export const selectUserId = createSelector(
  selectUser,
  user => (user ? user._id : null)
);

export const selectUserRole = createSelector(
  selectUser,
  user => {
    return user && user.userRole ? user.userRole : "visitor";
  }
);
