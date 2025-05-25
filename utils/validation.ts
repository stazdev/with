import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .min(10, "Invalid mobile number")
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export const accountinfoSchema = Yup.object().shape({
  fullName: Yup.string(),
  dob: Yup.string(),

  gender: Yup.string(),
});
export const addressinfoSchema = Yup.object().shape({
  billingAddress: Yup.string(),
  shippingAddress: Yup.string(),
});

export const addDeliveryAddressSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  postCode: Yup.string(),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

export const newPasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
