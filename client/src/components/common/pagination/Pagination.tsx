import React, { useState } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";

// Components
import { Select, FormControl, MenuItem, Input } from "@material-ui/core";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

const StyledPagination = styled.ul`
  display: flex;
  align-items: center;
`;

const StyledPaginationItem = styled.li<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.color.secondary};

  cursor: pointer;
  ${({ active, theme }) =>
    active &&
    `
    border: 2px solid ${theme.color.primary};
    font-weight: bolder;
    border-color: ${theme.color.primary};
    color: ${theme.color.primary};
    border-radius: 50%;
    padding: 0;
  `}
`;

const StyledNextIcon = styled(NavigateNext)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const StyledBeforeIcon = styled(NavigateBefore)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
`;

const StyledForm = styled.form`
  margin-right: 3rem;
  display: flex;
  align-items: center;
`;

const StyledPerPage = styled.span`
  /* font-size: ${({ theme }) => theme.text.fontSize.small}; */
  font-weight: bolder;
  margin-right: 1.3rem;
`;

const StyledFormControl = styled(FormControl)`
  margin-right: 3rem;
`;

const StyledBoldText = styled.span`
  font-weight: bolder;
`;

const StyledOfText = styled.span`
  margin: 0 0.5rem;
`;

const StyledSelect = styled(Select)`
  .MuiSelect-root {
    font-size: 1.4rem;
  }
`;

interface IPaginationProps {
  total: number;
  onChange: (pageNumper: number, perPage: number) => void;
  rowsOptions?: number[];
}

const Pagination = ({
  total,
  onChange,
  rowsOptions = [5, 10, 15]
}: IPaginationProps) => {
  const [perPage, setPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const paginationItems = Array(Math.ceil(total / perPage)).fill(null);
  const intl = useIntl();

  const handleChangePage = (pageNumber: number) => () => {
    onChange(pageNumber, perPage);
    setCurrentPageNumber(pageNumber);
  };

  const handleChangePerPage = (e: React.SyntheticEvent<EventTarget>) => {
    const newPerPage = parseInt((e.target as HTMLInputElement).value);
    if (typeof newPerPage === "number") {
      setCurrentPageNumber(1);
      onChange(currentPageNumber, newPerPage);
      setPerPage(newPerPage);
    }
  };

  const hasNextPage = paginationItems.length - currentPageNumber > 0;
  const hasBeforePage = currentPageNumber > 1;

  return (
    <>
      <StyledPagination>
        <StyledForm onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <StyledPerPage>
            {intl.formatMessage({
              id: "General.rowsPerPage",
              defaultMessage: "Rows Per Page"
            })}
            :
          </StyledPerPage>
          <StyledFormControl>
            <StyledSelect
              value={perPage}
              onChange={handleChangePerPage}
              input={<Input name="age" id="age-helper" />}
            >
              {rowsOptions.map((value, index) => (
                <MenuItem key={value * index} value={value}>
                  {value}
                </MenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>

          <StyledBoldText>
            {perPage * (currentPageNumber - 1) + 1} -{" "}
            {Math.min(perPage * currentPageNumber, total)}
          </StyledBoldText>
          <StyledOfText>
            {intl.formatMessage({ id: "General.of", defaultMessage: "of" })}
          </StyledOfText>
          <StyledBoldText>{total}</StyledBoldText>
        </StyledForm>
        {hasBeforePage && (
          <StyledBeforeIcon onClick={handleChangePage(currentPageNumber - 1)} />
        )}
        {paginationItems.map((paginationItem, index) => (
          <StyledPaginationItem
            key={index}
            onClick={handleChangePage(index + 1)}
            active={index + 1 === currentPageNumber}
          >
            {index + 1}
          </StyledPaginationItem>
        ))}
        {hasNextPage && (
          <StyledNextIcon onClick={handleChangePage(currentPageNumber + 1)} />
        )}
      </StyledPagination>
    </>
  );
};

export default Pagination;
