import React from "react";
import { FieldProps } from "formik";

// Components

import { TextField } from "@material-ui/core";

interface IProps extends FieldProps {
  placeholder: string;
  label: string;
  type: string;
  multiline?: boolean;
}

const Field: React.FC<IProps> = ({
  placeholder,
  label,
  type,
  field,
  multiline = false
}) => {
  return (
    <TextField
      multiline={multiline}
      placeholder={placeholder}
      type={type}
      label={label}
      {...field}
    ></TextField>
  );
};

export default Field;
