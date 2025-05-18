import { z } from "zod";
import type { ValidationInfoBase } from "@/utils/validations/base.validation";

export const loginValidation = z.object({
  email: z
    .string()
    .nonempty("LoginView.Validation.EmailRequired")
    .email("LoginView.Validation.EmailInvalid"),
  password: z
    .string()
    .nonempty("LoginView.Validation.PasswordRequired")
    .min(6, "LoginView.Validation.PasswordRangeLength")
    .max(36, "LoginView.Validation.PasswordRangeLength"),
});

export const validateLoginForm = async (loginData: {
  [key: string]: any;
}): Promise<LoginValidationInfo> => {
  let result = await loginValidation.safeParseAsync(loginData);
  if (result.success) {
    return { valid: true };
  }
  let fieldErrors = result.error.flatten().fieldErrors;
  return {
    valid: false,
    validation: {
      email: {
        valid: !fieldErrors.email?.[0],
        message: fieldErrors.email?.[0],
      },
      password: {
        valid: !fieldErrors.password?.[0],
        message: fieldErrors.password?.[0],
      },
    },
  };
};

export type LoginValidationInfo = {
  valid: boolean;
  validation?: {
    email: ValidationInfoBase;
    password: ValidationInfoBase;
  };
};

export const defaultLoginValidationInfo: LoginValidationInfo = {
  valid: true,
  validation: {
    email: {
      valid: true,
    },
    password: {
      valid: true,
    },
  },
};
