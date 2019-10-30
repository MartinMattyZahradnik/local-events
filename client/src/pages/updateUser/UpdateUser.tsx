import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";

// Components
import { Grid } from "@material-ui/core";
import { UserForm } from "components";

// Actions
import { updateUser, fetchUser } from "redux/user/actions";

// Selectors
import { selectUser } from "redux/user/selectors";
// Types

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
  const dispatch = useDispatch();
  const intl = useIntl();

  const userId = match.params.id;
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const handleSubmit = (values: any) => {
    dispatch(updateUser(userId, values));
  };

  const submitButtonLabel = intl.formatMessage({
    id: "General.update",
    defaultMessage: "Update"
  });

  return (
    <StyledFormWrapper container>
      <UserForm
        {...user}
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
