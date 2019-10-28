import { object, string, ref } from "yup"; // for only what you need

export default object().shape({
  password: string()
    .min(5, "Form.validations.min")
    .max(255, "Form.validations.max")
    .required("Form.validations.required"),
  passwordConfirm: string()
    .required("Form.validations.required")
    .oneOf([ref("password") || null], "Form.validations.passwordMatch")
});
