import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

// Actions
import { popNotificationFromStack } from "redux/notifications/actions";

const StyledNotification = styled.li`
  position: relative;
  margin-top: 0.5rem;
  color: #fff;
  display: flex;
  padding: 6px 24px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.4rem;
  z-index: 99999;
`;

const StyledCloseBtn = styled(IconButton)`
  color: white;
`;

interface INotificationProps {
  id: string;
  text: string;
}

const NOTIFICATION_DURATION = 4000;

const Notification = ({ id, text }: INotificationProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(popNotificationFromStack(id));
    }, NOTIFICATION_DURATION);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <StyledNotification>
      <Snackbar
        open={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        message={text}
        action={
          <StyledCloseBtn
            onClick={() => dispatch(popNotificationFromStack(id))}
          >
            <CloseIcon />
          </StyledCloseBtn>
        }
      />
    </StyledNotification>
  );
};

export default Notification;
