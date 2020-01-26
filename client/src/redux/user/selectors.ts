import { createSelector } from "reselect";
import { IState } from "redux/rootReducer";
import { AvailableUserRoles } from "./types";

const getUserData = (state: IState) => state.user;

export const selectUser = createSelector(
  getUserData,
  userData => userData.result
);

export const selectUserIsLoading = createSelector(
  getUserData,
  (userData): boolean => userData.isLoading
);

export const selectUserError = createSelector(
  getUserData,
  (userData): number | null => userData.error
);

export const selectUserImage = createSelector(selectUser, (user): string => {
  if (!user) {
    return "/defaultUserAvatarOther.png";
  }

  if (!user.image && user.gender === "male") {
    return "/defaultUserAvatarMale.jpg";
  }

  if (!user.image && user.gender === "female") {
    return "/defaultUserAvatarFemale.png";
  }

  if (!user.image && user.gender === "other") {
    return "/defaultUserAvatarOther.png";
  }

  return user.image;
});

export const selectIsUserLoggedIn = createSelector(
  selectUser,
  (user): boolean => Boolean(user)
);

export const selectUserId = createSelector(selectUser, (user): string | null =>
  user ? user._id : null
);

export const selectUserRole = createSelector(
  selectUser,
  (user): AvailableUserRoles =>
    user && user.userRole ? user.userRole : "visitor"
);

export const selectHasPermissionViewProfile = createSelector(
  [
    selectUserRole,
    selectUserId,
    (state: IState, profileId: string) => profileId
  ],
  (userRole, selectUserId, profileId): boolean => {
    return profileId === selectUserId || userRole === "admin";
  }
);
