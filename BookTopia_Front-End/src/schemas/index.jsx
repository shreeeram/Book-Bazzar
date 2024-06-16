import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{10}\)?)?$/;

export const signupUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("first name required"),
  email: Yup.string().email().required("email required"),
  mobNo: Yup.string()
    .min(10,"invalid mob no")
    .matches(phoneRegExp, "invalid mob no")
    .required("mob no required"),

  password: Yup.string()
    .min(6, "password must be 6 or more character")
    .required("password required")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),

  confirmpassword: Yup.string()
    .required("confirm password required")
    .oneOf([Yup.ref("password"), null], "password mismatch"),

    address:Yup.string().required(),
    city:Yup.string().required(),
    state:Yup.string().required(),
    pincode:Yup.number().required(),
});
