import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// Actions
import { changeLocale } from "redux/localization/actions";

// Others
import GbFlag from "./images/flag_gb.png";
import DeFlag from "./images/flag_de.png";

const StyledLanguageList = styled.ul`
  list-style: none;
  display: flex;
`;

const StyledLanguage = styled.li`
  margin-right: 1.2rem;
  cursor: pointer;
`;

const StyledFlag = styled.img`
  width: 3rem;
  height: 2rem;
`;

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <StyledLanguageList>
      <StyledLanguage onClick={() => dispatch(changeLocale("en"))}>
        <StyledFlag src={GbFlag} />
      </StyledLanguage>
      <StyledLanguage onClick={() => dispatch(changeLocale("de"))}>
        <StyledFlag src={DeFlag} />
      </StyledLanguage>
    </StyledLanguageList>
  );
};

export default LanguageSelector;
