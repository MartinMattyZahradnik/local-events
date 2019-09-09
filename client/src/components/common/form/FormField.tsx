import React from "react";
import { FieldProps } from "formik";

// Components

import { TextField } from "@material-ui/core";

interface IProps extends FieldProps {
  placeholder: string;
  label: string;
  type: string;
}

const Field: React.FC<IProps> = ({ placeholder, label, type, field }) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      label={label}
      {...field}
    ></TextField>
  );
};

export default Field;
