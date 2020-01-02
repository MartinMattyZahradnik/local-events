import React, { useState } from "react";
import styled from "styled-components";

// Components
import ClearIcon from "@material-ui/icons/Clear";

const StyledUploadImagePreviewWrapper = styled.div`
  position: relative;
  margin: auto;
  padding: 2rem 0;
`;

const StyledClearIcon = styled(ClearIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

interface IUploadFilePreviewProps {
  inputId: string;
  imageUrl: string | null;
  onChange: Function;
}

const UploadFilePreview = ({
  inputId,
  imageUrl = null,
  onChange
}: IUploadFilePreviewProps) => {
  const [image, setImage] = useState<null | string>(imageUrl);

  const handleInputChange = (event: any) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    onChange("image", event.currentTarget.files[0]);
  };

  const handleClearImage = () => {
    setImage(null);
    onChange("image", null);
  };

  return (
    <StyledUploadImagePreviewWrapper>
      <input
        id={inputId}
        onChange={handleInputChange}
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        hidden
      />

      {image && (
        <>
          <img style={{ width: "100%" }} src={image} />
          <StyledClearIcon onClick={handleClearImage} />
        </>
      )}
    </StyledUploadImagePreviewWrapper>
  );
};

export default UploadFilePreview;
