import { object, string, number, ref } from "yup"; // for only what you need

export default (isUpdate = false) =>
  object().shape({
    userName: string()
      .min(5, "Form.validations.min")
      .max(255, "Form.validations.max")
      .required("Form.validations.required"),

    firstName: string()
      .min(5, "Form.validations.min")
      .max(255, "Form.validations.max")
      .required("Form.validations.required"),

    lastName: string()
      .min(5, "Form.validations.min")
      .max(255, "Form.validations.max")
      .required("Form.validations.required"),

    email: string()
      .max(255, "Form.validations.max")
      .email("Form.validations.invalidEmail")
      .required("Form.validations.required"),

    phone: string()
      .min(8, "Form.validations.min")
      .max(15, "Form.validations.max")
      .notRequired(),

    birthDate: number().required("Form.validations.required"),
    gender: string().required("Form.validations.required"),
    ...(!isUpdate && {
      password: string()
        .min(5, "Form.validations.min")
        .max(255, "Form.validations.max")
    }),
    ...(!isUpdate && {
      passwordConfirm: string()
        .required("Form.validations.required")
        .oneOf([ref("password") || null], "Form.validations.passwordMatch")
    }),
    address: object().shape({
      street: string()
        .min(5, "Form.validations.min")
        .max(255, "Form.validations.max")
        .required("Form.validations.required"),
      postalCode: string(),
      city: string().required("Form.validations.required"),
      country: string().required("Form.validations.required")
    })
  });
