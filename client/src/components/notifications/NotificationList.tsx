import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// Components
import Notification from "./Notification";

// Selectors
import { selectNotificationList } from "redux/notifications/selectors";

const StyledNotificationList = styled.ul`
  position: fixed;
  bottom: 2rem;
  right: 0;
  max-width: 25%;
`;

const NotificationList = () => {
  const notifications = useSelector(selectNotificationList);

  return (
    <StyledNotificationList>
      {notifications.map(({ id, text }) => (
        <Notification key={id} id={id} text={text} />
      ))}
    </StyledNotificationList>
  );
};

export default NotificationList;
