import React, { useState } from "react";
import styled from "styled-components";
import { Select, FormControl, MenuItem, Input } from "@material-ui/core";

interface IPaginationProps {
  total: number;
  onChange: (pageNumper: number, perPage: number) => void;
}

const StyledPagination = styled.ul`
  display: flex;
`;

const StyledPaginationItem = styled.li<{ active: boolean }>`
  width: 3rem;
  color: ${({ theme, active }) =>
    active ? theme.color.primary : theme.color.secondary};
  cursor: pointer;
`;

const Pagination = ({
  total,

  onChange
}: IPaginationProps) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const paginationItems = Array(Math.ceil(total / perPage)).fill(null);

  const handleChangePage = (pageNumber: number) => () => {
    onChange(pageNumber, perPage);
    setCurrentPageNumber(pageNumber);
  };

  const handleChangePerPage = (e: React.ChangeEvent<any>) => {
    const newPerPage = e.target.value;
    setCurrentPageNumber(1);
    onChange(currentPageNumber, newPerPage);
    setPerPage(newPerPage);
  };

  return (
    <>
      <StyledPagination>
        <form onSubmit={(e: any) => e.prevent.default()}>
          <span>Rows Per Page:</span>
          <FormControl>
            <Select
              value={perPage}
              onChange={handleChangePerPage}
              input={<Input name="age" id="age-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>

          <span>
            {perPage * (currentPageNumber - 1) + 1} -{" "}
            {Math.min(perPage * currentPageNumber, total)}
          </span>
          <span>of {total}</span>
        </form>
        {paginationItems.map((paginationItem, index) => (
          <StyledPaginationItem
            key={index}
            onClick={handleChangePage(index + 1)}
            active={index + 1 === currentPageNumber}
          >
            {index + 1}
          </StyledPaginationItem>
        ))}
      </StyledPagination>
    </>
  );
};

export default Pagination;
