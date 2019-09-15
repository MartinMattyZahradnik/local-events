import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

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

const UpdateUser: React.FC = () => {
  const dispatch = useDispatch();
  const userId = "5d700df7dd776d0a9d0c0e17";
  const user = useSelector(selectUser);
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  const handleSubmit = (values: any) => {
    dispatch(updateUser(userId, values));
  };

  return (
    <StyledFormWrapper container>
      <UserForm {...user} onSubmit={handleSubmit} />
    </StyledFormWrapper>
  );
};

export default UpdateUser;
