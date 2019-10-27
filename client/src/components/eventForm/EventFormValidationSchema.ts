import { object, string, number } from "yup"; // for only what you need

export default object().shape({
  name: string()
    .min(5, "Form.validations.min")
    .max(255, "Form.validations.max")
    .required("Form.validations.required"),

  description: string()
    .max(255, "Form.validations.max")
    .required("Form.validations.required"),
  address: object().shape({
    street: string()
      .min(5, "Form.validations.min")
      .max(255, "Form.validations.max")
      .required("Form.validations.required"),
    postalCode: string(),
    city: string().required("Form.validations.required"),
    country: string().required("Form.validations.required")
  }),
  date: number().required("Form.validations.required")
});
