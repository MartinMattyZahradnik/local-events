import React from "react";
import { FieldProps } from "formik";

// Components

import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

type SelectOption = {
  label: string;
  value: any;
};

interface IProps extends FieldProps {
  placeholder: string;
  label: string;
  name: string;
  onChange: (value: any) => {};
  options: SelectOption[];
  required: boolean;
}

const Field: React.FC<IProps> = ({
  placeholder,
  required,
  label,
  field,
  options = [],
  field: { name, onChange, value = "" },
  form: { dirty, touched, errors },
  ...other
}) => {
  const id = `sel_${name}`;
  const errorText = errors[name];
  const hasError = dirty && touched[name] && errorText !== undefined;

  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputProps={{
          name,
          id: `input_${id}`
        }}
        {...other}
      >
        {options.map(item => (
          <MenuItem key={`${id}_${item.value}`} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {hasError && <FormHelperText>{errorText}</FormHelperText>}
    </>
  );
};

export default Field;
