import React, { useEffect } from "react";
import { FieldProps } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import { getTime } from "date-fns";
import styled from "styled-components";

// Components
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const StyledMuiPickersUtilsProvider = styled(MuiPickersUtilsProvider)``;

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  margin: 0;

  .MuiInputBase-input,
  .MuiInputLabel-root {
    font-size: 1.4rem;
  }

  .MuiInputLabel-root {
    color: ${({ theme }) => theme.color.primary};
  }

  .MuiSvgIcon-root {
    font-size: 1.8rem;
  }
`;

interface IProps extends FieldProps {
  label: string;
  defaultDate?: number;
  defaultFormat?: string;
  onChange: (field: string, value: any) => {};
}

const Field: React.FC<IProps> = ({
  field: { name, value },
  form,
  defaultFormat = "MM/dd/yyyy",
  defaultDate = Date.now(),
  onChange,
  ...other
}) => {
  useEffect(() => {
    onChange(name, defaultDate);
  }, []);
  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (date) {
      onChange(name, getTime(new Date(date)));
    }
  };

  return (
    <StyledMuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledKeyboardDatePicker
        margin="normal"
        id={`id-${name}`}
        label="Date picker dialog"
        format={defaultFormat}
        value={value}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
        onChange={handleDateChange}
        {...other}
      />
    </StyledMuiPickersUtilsProvider>
  );
};

export default Field;
