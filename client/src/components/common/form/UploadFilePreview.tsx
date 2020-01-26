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
  imageUrl: string;
  onChange: Function;
}

const UploadFilePreview = ({
  inputId,
  imageUrl = "",
  onChange
}: IUploadFilePreviewProps) => {
  const [image, setImage] = useState<string>(imageUrl);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImage(URL.createObjectURL(file));
    onChange("imageUrl", file);
  };

  const handleClearImage = () => {
    setImage("");
    onChange("image", "");
  };

  return (
    <StyledUploadImagePreviewWrapper>
      <input
        id={inputId}
        onChange={handleInputChange}
        type="file"
        name="imageUrl"
        accept="image/png, image/jpeg"
        hidden
      />

      {image && (
        <>
          <img style={{ width: "100%" }} src={image} alt="" />
          <StyledClearIcon onClick={handleClearImage} />
        </>
      )}
    </StyledUploadImagePreviewWrapper>
  );
};

export default UploadFilePreview;
