import { object, string } from "yup"; // for only what you need

export default object().shape({
  email: string()
    .max(255, "Form.validations.max")
    .email("Form.validations.invalidEmail")
    .required("Form.validations.required"),
  password: string()
    .min(5, "Form.validations.min")
    .max(255, "Form.validations.max")
    .required("Form.validations.required")
});
