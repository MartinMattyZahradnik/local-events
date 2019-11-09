import { object, string, number } from "yup";

export default object().shape({
  name: string()
    .min(5, "Form.validations.min")
    .max(255, "Form.validations.max")
    .required("Form.validations.required"),

  description: string().required("Form.validations.required"),
  address: object().shape({
    street: string()
      .min(5, "Form.validations.min")
      .max(255, "Form.validations.max")
      .required("Form.validations.required"),
    postalCode: string(),
    city: string().required("Form.validations.required"),
    countryCode: string().required("Form.validations.required")
  }),
  date: number().required("Form.validations.required"),
  category: string().notRequired()
});
