import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components
import { Typography } from "@material-ui/core";

const StyledErrorMsg = styled(Typography)`
  color: ${({ theme }) => theme.color.error};
  margin-top: 1rem;
`;

interface FormErrorProps {
  touched: boolean | undefined;
  errorMsgId: string | undefined;
}

const FormError = ({ touched, errorMsgId }: FormErrorProps) => {
  const { formatHTMLMessage } = useIntl();

  return touched && errorMsgId ? (
    <StyledErrorMsg>
      {formatHTMLMessage({
        id: errorMsgId || "",
        defaultMessage: ""
      })}
    </StyledErrorMsg>
  ) : null;
};

export default FormError;
