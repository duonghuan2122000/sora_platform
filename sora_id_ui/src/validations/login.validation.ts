/**
 * File validate login
 */

import { createSignal } from "solid-js";
import * as yup from "yup";

interface LoginDataTypes {
  email?: string;
  password?: string;
}

interface ErrorLoginDataTypes {
  // message lỗi email
  email?: string;
  // message lỗi mật khẩu
  password?: string;
}

export const useLoginValidation = () => {
  const [loginData, setLoginData] = createSignal<LoginDataTypes>({});

  const [errorMessage, setErrorMessage] = createSignal<ErrorLoginDataTypes>({});

  // const loginValidationSchema = z.object({
  //   // email
  //   email: z
  //     .string()
  //     .nonempty({ message: "Email không được để trống" })
  //     .email("Email không hợp lệ")
  //     .trim(),
  //   // mật khẩu
  //   password: z
  //     .string()
  //     .nonempty("Mật khẩu không được để trống")
  //     .min(6, "Mật khẩu cần có 6 đến 32 ký tự")
  //     .max(32, "Mật khẩu cần có 6 đến 32 ký tự")
  //     .trim(),
  // });

  const loginValidationSchema = yup.object({
    // email
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ")
      .trim(),
    // mật khẩu
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu cần có 6 đến 32 ký tự")
      .max(32, "Mật khẩu cần có 6 đến 32 ký tự")
      .trim(),
  });

  /**
   * Thực hiện validate
   */
  const validate = async (field?: string) => {
    const fieldErrors: Record<string, string> = {};
    try {
      const validData = await loginValidationSchema.validate(
        {
          ...loginData(),
        },
        { abortEarly: false }
      );
      setLoginData({ ...validData });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((e) => {
          if (e.path && !fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message;
          }
        });

        if (field) {
          setErrorMessage({ ...errorMessage(), [field]: fieldErrors[field] });
        } else {
          setErrorMessage({ ...fieldErrors });
        }
        return false;
      }
    }
    return true;
  };

  return {
    loginData,
    loginValidationSchema,
    setLoginData,
    errorMessage,
    validate,
  };
};
