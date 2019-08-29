import React from "react";

interface IPaginationProps {
  total: number;
  perPage?: number;
  currentPageNumber?: number;
  onPageChange: (pageNumper: number) => void;
}

const Pagination = ({
  total,
  perPage = 20,
  currentPageNumber = 1,
  onPageChange
}: IPaginationProps) => {
  const paginationItems = Math.ceil(total / perPage);
  console.log(paginationItems, "paginationItems");

  return (
    <>
      <p>Total {total}</p>
      <p>PerPage {perPage}</p>
      <p>currentPageNumber {currentPageNumber}</p>

      <ul>
        <li onClick={() => onPageChange(1)}>1</li>
        <li onClick={() => onPageChange(2)}>2</li>
      </ul>
    </>
  );
};

export default Pagination;
