import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import { TextField } from "@material-ui/core";

// Actions
import { setSearchTerm } from "redux/events/actions";

const StyledSearch = styled(TextField)`
  position: relative;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.15);
  width: 17rem;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .MuiInputBase-input {
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.1rem;
  }

  .MuiInput-underline {
    &:before,
    &:after {
      display: none;
    }
  }
`;

const Search = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(setSearchTerm(value));
  };

  return (
    <StyledSearch id="search" placeholder="Search" onChange={handleChange} />
  );
};

export default Search;
