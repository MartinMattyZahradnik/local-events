import styled from "styled-components";
import { Button } from "@material-ui/core";

export default styled(Button)`
  background: ${({ theme }) => theme.color.secondary};

  border-radius: 0.3rem;
  border: 0;
  height: 3.5rem;
  padding: 0 2.5rem;
  box-shadow: 0 0.3rem 0.5rem 0.2rem rgba(139, 122, 107, 0.2);
  color: white;
  font-size: ${({ theme }) => theme.text.fontSize.normal};
  text-transform: uppercase;
  &:hover {
    background: ${({ theme }) => theme.color.primary};
  }
`;
