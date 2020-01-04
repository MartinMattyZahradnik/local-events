import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Components
import { Select, MenuItem } from "@material-ui/core";

// Actions
import { setSearchCity } from "redux/events/actions";

// Selectors
import { selectSearchCity } from "redux/events/selectors";

const StyledSearchCity = styled(Select)`
  min-width: 12rem;
  font-size: 1.4rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  &.MuiInput-underline:before {
    border-bottom: 1px solid ${({ theme }) => theme.color.secondary};
  }

  &.MuiInput-underline:after {
    border-bottom: 2px solid white;
  }
`;

const SearchCity = () => {
  const city = useSelector(selectSearchCity);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setSearchCity(e.target.value as string));
  };

  return (
    <StyledSearchCity value={city} onChange={handleChange} displayEmpty>
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="London">London</MenuItem>
      <MenuItem value="New York">New York</MenuItem>
    </StyledSearchCity>
  );
};

export default SearchCity;
