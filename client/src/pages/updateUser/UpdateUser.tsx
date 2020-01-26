import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "react-router-dom";

// Components
import { Grid } from "@material-ui/core";
import { UserForm } from "components";

// Actions
import { updateUser, fetchUser } from "redux/user/actions";
import { pushNotificationToStack } from "redux/notifications/actions";

// Selectors
import {
  selectUser,
  selectHasPermissionViewProfile
} from "redux/user/selectors";

// Types
import { IState } from "redux/rootReducer";
import { IUserFormValues } from "redux/user/types";

const StyledFormWrapper = styled(Grid)`
  margin: auto;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 10.4rem);
`;

type MatchParams = {
  id: string;
};

interface IUpdateUserProps extends RouteComponentProps<MatchParams> {}

const UpdateUser: React.FC<IUpdateUserProps> = ({ match }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const intl = useIntl();
  const userId = match.params.id;
  const user = useSelector(selectUser);
  const hasViewPermission = useSelector((state: IState) =>
    selectHasPermissionViewProfile(state, userId)
  );

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const handleSubmit = (values: IUserFormValues) => {
    dispatch(updateUser(userId, values));
  };

  const submitButtonLabel = intl.formatMessage({
    id: "General.update",
    defaultMessage: "Update"
  });

  if (!user) {
    return <div>Loading</div>;
  }

  if (!hasViewPermission) {
    dispatch(
      pushNotificationToStack(
        formatMessage({
          id: "General.permissionDenied",
          defaultMessage: "You have no permissions to perform this action"
        })
      )
    );
    return <Redirect to={`/user/${userId}/events`} />;
  }

  return (
    <StyledFormWrapper container>
      <UserForm
        {...user}
        isUpdate
        onSubmit={handleSubmit}
        submitButtonLabel={submitButtonLabel}
        formHeading={intl.formatMessage({
          id: "User.update",
          defaultMessage: "Update user"
        })}
      />
    </StyledFormWrapper>
  );
};

export default UpdateUser;
