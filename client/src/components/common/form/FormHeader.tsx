import React from "react";
import styled from "styled-components";

const StyledFormHeader = styled.div`
  height: 5.5rem;
  background-color: ${({ theme }) => theme.color.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 0.6rem;
`;

interface FormHeaderProps {
  formHeading: string;
}

const FormHeader = ({ formHeading }: FormHeaderProps) => {
  return <StyledFormHeader>{formHeading}</StyledFormHeader>;
};

export default FormHeader;
