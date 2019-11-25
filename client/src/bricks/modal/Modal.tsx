import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

// Components
import { Grid, Paper } from "@material-ui/core";
import { Button } from "bricks";

const StyledModalRoot = styled(Grid)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const StyledModalFooter = styled(Grid)`
  padding: 1rem 2rem;
  justify-content: space-between;
  margin-top: auto;
`;

const StyledModalTitle = styled(Grid)`
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.color.primary};
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  letter-spacing: 2px;
`;

const StyledContentWrapper = styled(Paper)`
  min-height: 15rem;
  display: flex;
  flex-direction: column;
`;

interface IModalProps {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => any;
  onConfirm: () => any;
  title?: string;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
}

const Modal = ({
  children,
  open,
  onClose,
  onConfirm,
  title,
  confirmLabel = "Ok",
  cancelLabel = "Cancel"
}: IModalProps) => {
  const el = document.createElement("div");
  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    document.addEventListener("keydown", handleKeyDown, true);
    if (modalRoot) {
      modalRoot.appendChild(el);
      return () => {
        modalRoot.removeChild(el);
        document.removeEventListener("keyDown", handleKeyDown, true);
      };
    }
  });

  const handleKeyDown = (e: any) => {
    if (open && e.keyCode === 27) {
      // ESC
      console.log(e.keyCode);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <StyledModalRoot id="modal-overlay">
      <StyledContentWrapper>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <Grid>{children}</Grid>
        <StyledModalFooter container alignContent="center">
          <Button onClick={handleCloseModal}>{cancelLabel}</Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </StyledModalFooter>
      </StyledContentWrapper>
    </StyledModalRoot>,
    el
  );
};

export default Modal;
