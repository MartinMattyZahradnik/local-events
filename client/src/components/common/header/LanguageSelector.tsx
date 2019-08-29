import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// Actions
import { changeLocale } from "redux/localization/actions";

const StyledLanguageList = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledLanguage = styled.li`
  margin-right: 1.2rem;
  cursor: pointer;
`;

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <StyledLanguageList>
      <StyledLanguage onClick={() => dispatch(changeLocale("en"))}>
        English
      </StyledLanguage>
      <StyledLanguage onClick={() => dispatch(changeLocale("de"))}>
        German
      </StyledLanguage>
    </StyledLanguageList>
  );
};

export default LanguageSelector;
