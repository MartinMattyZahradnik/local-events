import React, { useEffect } from "react";
import { FieldProps } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import { getTime } from "date-fns";

// Components
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate
} from "@material-ui/pickers";

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
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
    </MuiPickersUtilsProvider>
  );
};

export default Field;
